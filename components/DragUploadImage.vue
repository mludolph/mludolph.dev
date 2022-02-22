<template>
  <div
    class="
      flex flex-col
      items-center
      justify-center
      border border-dashed border-gray-400
      bg-gray-200
      hover:bg-gray-100
      dark:bg-gray-600 dark:hover:bg-gray-500
      rounded-lg
      relative
    "
  >
    <div class="flex flex-col items-center justify-center gap-2 px-6">
      <font-awesome-icon :icon="['fas', 'folder']"></font-awesome-icon>
      <span v-if="label === null" class="text-sm text-center"
        >Choose {{ multiple ? "images" : "an image" }} from your files,<br />
        or drag & drop {{ multiple ? "images" : "an image" }} here</span
      >
      <span v-else class="text-sm text-center"> {{ label }}</span>
    </div>
    <input
      type="file"
      :multiple="multiple"
      @change="onFileUpload"
      accept="image/*"
      class="absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer"
    />
  </div>
</template>

<script>
export default {
  props: {
    multiple: {
      type: Boolean,
      default: true,
    },
    imageFormat: {
      type: String,
      default: "image/jpeg",
    },
    label: {
      type: String,
      default: null,
    },
    crop: {
      type: Boolean,
      default: true,
    },
    cropResolution: {
      type: Object,
      default: () => {
        return { w: 224, h: 224 };
      },
    },
  },
  data() {
    return { canvas: null };
  },
  methods: {
    getBase64(file) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (ev) => {
          resolve(ev.target.result);
        };
        reader.readAsDataURL(file);
      });
    },
    getMeta(url) {
      var img = new Image();
      return new Promise((resolve) => {
        img.onload = function () {
          resolve({ img, width: img.width, height: img.height });
        };
        img.src = url;
      });
    },
    async getCanvas(url) {
      if (!this.ctx) {
        let canvas = document.createElement("canvas");
        canvas.height = this.cropResolution.h;
        canvas.width = this.cropResolution.w;
        this.canvas = canvas;

        this.ctx = canvas.getContext("2d");
      }
      const { img, width, height } = await this.getMeta(url);
      const crop = (width - height) / 2;
      const { ctx, canvas } = this;
      let fac = 1;
      ctx.drawImage(
        img,
        crop,
        0,
        width - 2 * crop,
        height,
        0,
        0,
        fac * canvas.width,
        canvas.height
      );

      return canvas;
    },
    async onFileUpload(evt) {
      const files = [...evt.target.files];
      console.log(files);
      let promises = [];
      files.forEach((file) =>
        promises.push(
          this.getBase64(file).then((url) => {
            if (this.crop) {
              return this.getCanvas(url).then((canvas) =>
                canvas.toDataURL(this.imageFormat)
              );
            } else {
              return url;
            }
          })
        )
      );
      const names = files.map((file) => file.name);

      let sources = await Promise.all(promises);
      this.$emit("files", sources, names);
    },
  },
};
</script>
