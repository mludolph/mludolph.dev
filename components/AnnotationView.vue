<template>
  <div class="flex flex-col w-fit h-full relative">
    <draggable
      ref="draggable"
      :x="annotationArea.x"
      :y="annotationArea.y"
      :w="annotationArea.width"
      :h="annotationArea.height"
      :z="40"
      @dragging="onDrag"
      @resizing="onResize"
      @deactivated="onDeactivate"
      :prevent-deactivation="true"
      :parent="true"
      :active="annotating"
      :draggable="true"
      :resizable="true"
      :class="{ hidden: !annotating }"
      class="cursor-pointer"
      :style="borderColorStyle(clsId)"
    />
    <canvas
      ref="highlight"
      class="absolute w-full h-full opacity-60 pointer-events-none z-30"
      :class="{
        hidden: !annotating && !selecting,
      }"
    />
    <template v-if="!annotating && !selecting">
      <draggable
        v-for="(obj, idx) in sample.annotations"
        :ref="'annotation' + idx"
        :key="idx"
        :x="obj.area.x"
        :y="obj.area.y"
        :w="obj.area.width"
        :h="obj.area.height"
        :z="20"
        :active="idx === selectedAnnotationId"
        :parent="true"
        :draggable="false"
        :resizable="false"
        @activated="onSelectAnnotation(idx)"
        :style="borderColorStyle(obj.clsId)"
        :class="{ hidden: idx === selectedAnnotationId }"
        class="cursor-pointer"
      />
    </template>

    <canvas
      ref="annotations"
      class="absolute w-full h-full pointer-events-none"
    />
    <img
      ref="preview"
      :src="sample.src"
      class="
        h-full
        max-h-full max-w-full
        select-none
        self-center
        justify-self-center
      "
      @mousedown="onStartSelect"
      @mousemove="onMove"
      @mouseup="onStopSelect"
      @mouseleave="onStopSelect"
      @load="resizeCanvas"
      draggable="false"
      @dragstart="() => false"
    />
  </div>
</template>

<script>
import * as cv from "opencv.js";
export default {
  props: {
    sample: Object,
    clsId: String,
    classes: Object,
    borderWidth: {
      type: Number,
      default: 3,
    },
    borderStyle: {
      type: String,
      default: "dashed",
    },
  },
  data() {
    return {
      annotating: false,
      selecting: false,
      selectArea: {
        x: 0,
        y: 0,
        width: 1,
        height: 1,
      },
      annotationArea: {
        x: 0,
        y: 0,
        width: 1,
        height: 1,
      },
      selectedAnnotationId: -1,
    };
  },
  mounted() {
    window.addEventListener("resize", this.resizeCanvas);
    window.addEventListener("keydown", this.onKeypress);
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeCanvas);
    window.addEventListener("keydown", this.onKeypress);
  },
  computed: {
    annotations() {},
  },
  methods: {
    borderColorStyle(clsId) {
      const cls = clsId === "" ? null : this.classes[clsId];
      if (cls === null) {
        return "";
      }
      return `border: ${this.borderWidth}px solid ${cls.color} !important;`;
    },
    isCancelKey(key) {
      return (
        ["Backspace", "Delete", "Escape"].filter((k) => k === key).length > 0
      );
    },
    isDeleteKey(key) {
      return ["Backspace", "Delete"].filter((k) => k === key).length > 0;
    },
    isSubmitKey(key) {
      return ["Enter"].filter((k) => k === key).length > 0;
    },
    onKeypress(evt) {
      if (evt.key === "ArrowLeft") {
        this.selectedAnnotationId = -1;
        this.selecting = false;
        this.annotating = false;
        this.$emit("previous");
      } else if (evt.key === "ArrowRight") {
        this.selectedAnnotationId = -1;
        this.selecting = false;
        this.annotating = false;
        this.$emit("next");
      } else if (this.isCancelKey(evt.key)) {
        if (this.isDeleteKey(evt.key) && this.selectedAnnotationId !== -1) {
          const update = [...this.sample.annotations];
          this.$delete(update, this.selectedAnnotationId);
          this.$emit("annotate", update);
        }
        this.$emit("select", -1);
        this.selectedAnnotationId = -1;
        this.annotating = false;
        this.selecting = false;
      } else if (
        this.isSubmitKey(evt.key) &&
        this.annotating &&
        this.clsId !== ""
      ) {
        this.updateAnnotation();
      }
    },
    onStartSelect(evt) {
      if (
        this.clsId !== "" &&
        !this.annotating &&
        this.selectedAnnotationId === -1
      ) {
        this.selecting = true;
        this.selectArea.x = evt.offsetX;
        this.selectArea.y = evt.offsetY;
        this.highlightArea(this.selectArea);
      }
    },
    onMove(evt) {
      if (this.selecting) {
        const x = evt.offsetX;
        const y = evt.offsetY;

        this.selectArea.width = x - this.selectArea.x;
        this.selectArea.height = y - this.selectArea.y;
        this.boxArea(this.selectArea, true);
      }
    },
    onStopSelect(evt) {
      if (this.selecting) {
        this.selecting = false;
        if (this.selectArea.width < 0) {
          this.selectArea.width = -this.selectArea.width;
          this.selectArea.x = this.selectArea.x - this.selectArea.width;
        }
        if (this.selectArea.height < 0) {
          this.selectArea.height = -this.selectArea.height;
          this.selectArea.y = this.selectArea.y - this.selectArea.height;
        }

        this.annotationArea = { ...this.selectArea };
        this.selectArea = { x: 0, y: 0, width: 1, height: 1 };
        this.annotating = true;
        this.highlightArea(this.annotationArea);
      }
    },
    updateAnnotation() {
      const update = [...this.sample.annotations];
      const annotation = {
        clsId: this.clsId,
        area: this.annotationArea,
        mask: this.processArea(this.annotationArea),
      };

      if (this.selectedAnnotationId === -1) {
        update.push(annotation);
      } else {
        this.$set(update, this.selectedAnnotationId, annotation);
      }

      this.$emit("annotate", update);
      this.$emit("select", -1);
      this.selectedAnnotationId = -1;
      this.selecting = false;
      this.annotating = false;
    },
    onDeactivate() {
      if (this.annotating && this.clsId !== "") {
        this.updateAnnotation();
      }
    },
    onResize(x, y, width, height) {
      this.annotationArea = {
        x,
        y,
        width,
        height,
      };
      this.highlightArea(this.annotationArea);
    },
    onDrag(x, y) {
      this.annotationArea.x = x;
      this.annotationArea.y = y;
      this.highlightArea(this.annotationArea);
    },
    onSelectAnnotation(idx) {
      this.selectedAnnotationId = idx;
      this.annotationArea = { ...this.sample.annotations[idx].area };
      this.annotating = true;
      this.$emit("select", idx);
      this.highlightArea(this.annotationArea);
    },
    boxArea(area, highlight = false) {
      const canvas = this.$refs.highlight;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (highlight) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.rect(area.x, area.y, area.width, area.height);
        ctx.rect(canvas.width, 0, -canvas.width, canvas.height);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.rect(area.x, area.y, area.width, area.height);
      ctx.lineWidth = this.borderWidth;
      ctx.strokeStyle =
        this.clsId === "" ? "black" : this.classes[this.clsId].color;
      if (this.borderStyle === "dashed") {
        ctx.setLineDash([5, 5]);
      }
      ctx.stroke();
    },
    highlightArea(area) {
      const canvas = this.$refs.highlight;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.rect(area.x, area.y, area.width, area.height);
      ctx.rect(canvas.width, 0, -canvas.width, canvas.height);
      ctx.fill();
    },
    selectAnnotation(idx) {
      this.selectedAnnotationId = idx;
      this.annotationArea = { ...this.sample.annotations[idx].area };
      this.annotating = true;
      this.highlightArea(this.annotationArea);
    },
    drawAnnotations() {},
    resizeCanvas() {
      const img = this.$refs.preview;
      const width = img.clientWidth;
      const height = img.clientHeight;

      this.$refs.highlight.width = width;
      this.$refs.highlight.height = height;
      this.$refs.annotations.width = width;
      this.$refs.annotations.height = height;
    },
    processArea(area) {
      const img = this.$refs.preview;
      const { x, y, width, height } = area;

      let src = cv.imread(img);
      cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0);

      let mask = new cv.Mat();
      let bgdModel = new cv.Mat();
      let fgdModel = new cv.Mat();
      let rect = new cv.Rect(x, y, x + width, y + height);
      cv.grabCut(src, mask, rect, bgdModel, fgdModel, 1, cv.GC_INIT_WITH_RECT);

      // draw foreground
      for (let i = 0; i < src.rows; i++) {
        for (let j = 0; j < src.cols; j++) {
          if (mask.ucharPtr(i, j)[0] == 0 || mask.ucharPtr(i, j)[0] == 2) {
            src.ucharPtr(i, j)[3] = 255;
          } else {
            src.ucharPtr(i, j)[0] = 255;
            src.ucharPtr(i, j)[1] = 255;
            src.ucharPtr(i, j)[2] = 255;
          }
        }
      }
      // draw grab rect
      /*let color = new cv.Scalar(0, 0, 255);
      let point1 = new cv.Point(rect.x, rect.y);
      let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
      cv.rectangle(src, point1, point2, color);
      */

      let imgdata = new ImageData(
        new Uint8ClampedArray(src.data, src.cols, src.rows)
      );
      src.delete();
      mask.delete();
      bgdModel.delete();
      fgdModel.delete();

      return imgdata;
    },
    drawAnnotations() {
      if (this.sample.annotations.length > 0) {
        cv.imshow("canvasOutput", gray);
      }
    },
  },
};
</script>
