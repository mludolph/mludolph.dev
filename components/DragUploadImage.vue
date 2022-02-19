<template>
  <div
    class="
      flex flex-col flex-grow
      items-center
      justify-center
      w-full
      h-full
      border border-dashed border-gray-400
      bg-gray-600
      hover:bg-gray-500
      rounded-lg
      cursor-pointer
      relative
    "
  >
    <div
      class="
        flex flex-col
        items-center
        justify-center
        gap-2
        absolute
        px-6
        cursor-pointer
      "
    >
      <font-awesome-icon :icon="['fas', 'folder']"></font-awesome-icon>
      <span class="text-sm text-center"
        >Chooses images from your files, or drag & drop images here</span
      >
    </div>
    <input
      type="file"
      multiple
      @change="onFileUpload"
      accept="image/*"
      class="opacity-0 w-full h-full cursor-pointer"
    />
  </div>
</template>

<script>
export default {
  props: {
    imageFormat: {
      type: String,
      default: "image/jpeg",
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
        canvas.height = 224;
        canvas.width = 224;
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
      let promises = [];
      files.forEach((file) =>
        promises.push(
          this.getBase64(file)
            .then((url) => this.getCanvas(url))
            .then((canvas) => canvas.toDataURL(this.imageFormat))
        )
      );
      let sources = await Promise.all(promises);
      this.$emit("files", sources);
    },
  },
};
</script>
