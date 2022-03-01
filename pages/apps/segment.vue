<template>
  <div
    class="flex flex-row w-screen min-w-screen max-w-screen max-h-screen gap-6"
  >
    <div
      class="flex flex-col h-screen min-h-screen max-h-screen pt-28 gap-4 w-64"
    >
      <div class="flex flex-col gap-3 h-1/2 overflow-scroll px-2">
        <h2 class="font-semibold">Classes</h2>
        <segment-class-card
          v-for="cls in classes"
          :key="cls.id"
          v-model="classes[cls.id]"
          @remove="removeClass(cls.id)"
          @select="selectClass(cls.id)"
          :class="{
            'outline outline-offset-2 outline-2': selectedClassId === cls.id,
          }"
          :style="getOutline(cls)"
        />
        <div
          class="
            flex flex-col
            border-b border-x border-gray-600 border-dashed
            hover:text-gray-500
            items-center
            justify-center
            cursor-pointer
            rounded
            p-3
          "
          @click="addClass()"
        >
          <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
        </div>
      </div>
      <div
        v-if="annotationView"
        class="flex flex-col gap-3 h-1/2 overflow-scroll px-2"
      >
        <h2 class="font-semibold">Annotations</h2>
        <div
          v-for="(obj, idx) in samples[selectedSampleId].annotations"
          :key="idx"
          class="flex flex-col bg-gray-700 rounded p-2 cursor-pointer"
          :class="{
            'outline outline-offset-2 outline-2 outline-gray-400':
              selectedAnnotationId === idx,
          }"
          @click="selectAnnotation(idx)"
        >
          <div class="flex flex-row gap-3 justify-between">
            <div class="flex flex-row gap-2">
              <span
                class="text-sm font-semibold"
                :style="'color: ' + classes[obj.clsId].color"
                >#{{ ("00" + idx).slice(-3) }}</span
              >
              <span class="text-sm">{{ classes[obj.clsId].name }}</span>
            </div>
            <font-awesome-icon
              :icon="['fas', 'trash']"
              class="cursor-pointer hover:text-gray-500"
              @click.stop="removeAnnotation(idx)"
            ></font-awesome-icon>
          </div>
          <div class="flex flex-row justify-between gap-2">
            <span class="text-xs text-gray-500"
              >x: {{ obj.area.x }}, y: {{ obj.area.y }}</span
            >
            <span class="text-xs text-gray-500"
              >w: {{ obj.area.width }}, h: {{ obj.area.height }}</span
            >
          </div>
          <div class="flex flex-row gap-2"></div>
        </div>
      </div>
    </div>
    <div
      class="
        flex flex-col
        h-screen
        min-h-screen
        max-w-screen max-h-screen
        items-center
        w-full
        pt-8
        pr-8
        pb-8
      "
    >
      <div class="flex flex-row w-full py-2 items-center justify-between">
        <div class="flex flex-row gap-2 h-fit">
          <template v-if="annotationView">
            <span
              class="text-xs uppercase px-2 bg-gray-600 text-gray-400 rounded"
              >Enter: confirm</span
            >
            <span
              class="text-xs uppercase px-2 bg-gray-600 text-gray-400 rounded"
              >Bksp/Del: delete</span
            >
            <span
              class="text-xs uppercase px-2 bg-gray-600 text-gray-400 rounded"
              >Esc: cancel</span
            >
            <span
              class="text-xs uppercase px-2 bg-gray-600 text-gray-400 rounded"
              >←/→: nav</span
            >
          </template>
        </div>
        <div class="flex flex-row">
          <button
            class="
              flex flex-col
              items-center
              justify-center
              text-gray-300
              bg-gray-600
              hover:bg-gray-700
              w-6
              h-6
              rounded
            "
            v-if="annotationView"
            @click="annotationView = false"
          >
            <font-awesome-icon :icon="['fas', 'grip']" />
          </button>
          <button
            class="
              flex flex-col
              items-center
              justify-center
              text-gray-300
              bg-gray-600
              hover:bg-gray-700
              disabled:bg-gray-600 disabled:text-gray-500
              w-6
              h-6
              rounded
            "
            :disabled="
              samples.length === 0 ||
              selectedSampleId === -1 ||
              selectedSampleId >= samples.length
            "
            v-else
            @click="annotationView = true"
          >
            <font-awesome-icon :icon="['fas', 'crop-simple']" />
          </button>
        </div>
      </div>
      <canvas ref="canvasOutput" id="canvasOutput" />
      <annotation-view
        v-if="annotationView"
        ref="annotationView"
        :sample="samples[selectedSampleId]"
        :clsId="selectedClassId"
        :classes="classes"
        @annotate="annotate(selectedSampleId, $event)"
        @next="
          selectedSampleId = Math.min(selectedSampleId + 1, samples.length - 1)
        "
        @previous="selectedSampleId = Math.max(selectedSampleId - 1, 0)"
        @select="selectedAnnotationId = $event"
      />
      <div v-else class="flex flex-row flex-wrap w-full h-full gap-3">
        <div
          v-for="(sample, i) in samples"
          :key="i"
          class="
            flex flex-col
            items-center
            justify-center
            w-32
            h-32
            group
            relative
          "
        >
          <font-awesome-icon
            :icon="['fas', 'trash']"
            class="
              absolute
              right-1
              top-1
              hidden
              group-hover:block
              text-gray-300
              hover:text-gray-400
              cursor-pointer
              z-40
            "
            @click="$delete(samples, i)"
          />
          <img
            :src="sample.src"
            class="rounded shadow cursor-pointer"
            :class="{
              'outline outline-2 outline-offset-2 outline-blue-400':
                sample.annotations.length > 0,
            }"
            @click="openAnnotationView(i)"
          />
        </div>

        <drag-upload-image
          @files="onFileUpload"
          :crop="false"
          label="Add image"
          class="w-32 h-32"
        ></drag-upload-image>
      </div>
      <div class="flex flex-row"></div>
    </div>
  </div>
</template>

<script>
import * as randomColor from "random-material-color";

export default {
  layout: "minimal",
  data() {
    return {
      menuVisible: false,
      annotationView: false,
      selectedSampleId: -1,
      selectedAnnotationId: -1,
      stencilCoordinates: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      },
      selectedClassId: "",
      classes: {},
      samples: [],
      canvas: null,
    };
  },
  computed: {},
  mounted() {
    this.addClass();
    this.selectedClassId = Object.values(this.classes)[0].id;
  },
  methods: {
    getOutline(cls) {
      return `outline-color: ${cls.color}`;
    },
    openAnnotationView(i) {
      this.selectedSampleId = i;
      this.annotationView = true;
    },
    onFileUpload(files, names) {
      files.forEach((file, idx) =>
        this.samples.push({ name: names[idx], src: file, annotations: [] })
      );
    },
    generateColor() {
      let color = randomColor.getColor();
      let i = 0;
      const maxIter = 15;

      while (
        Object.values(this.classes).filter((cls) => cls.color === color)
          .length > 0
      ) {
        color = randomColor.getColor();
        i += 1;
        if (i >= maxIter) {
          break;
        }
      }
      return color;
    },
    addClass() {
      const id = Math.random().toString(16).slice(2);
      const cls = {
        id,
        name: "Class " + (Object.values(this.classes).length + 1),
        color: this.generateColor(),
        selected: false,
      };
      this.$set(this.classes, id, cls);
    },
    selectClass(id) {
      this.selectedClassId = id;
    },
    removeClass(id) {
      if (this.selectedClassId === id) {
        this.selectedClassId = "";
      }

      this.samples = this.samples.map((sample) => {
        return {
          ...sample,
          annotations: sample.annotations.filter(
            (annotation) => annotation.clsId !== id
          ),
        };
      });
      this.$delete(this.classes, id);
    },
    annotate(sampleId, annotations) {
      const sample = this.samples[sampleId];
      const update = {
        ...sample,
        annotations,
      };
      this.$set(this.samples, sampleId, update);
    },
    removeAnnotation(id) {
      const sample = this.samples[this.selectedSampleId];
      this.$delete(sample.annotations, id);
      this.$set(this.samples, this.selectedSampleId, { ...sample });
    },
    selectAnnotation(id) {
      this.selectedAnnotationId = id;
      this.$refs.annotationView.selectAnnotation(id);
    },
  },
};
</script>

<style lang="postcss">
.vc-chrome {
  @apply bg-transparent rounded overflow-hidden shadow !important;
}
.vc-chrome-body {
  @apply dark:bg-gray-700;
}
</style>
