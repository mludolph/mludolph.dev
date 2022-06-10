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
        return { width: 224, height: 224 };
      },
    },
  },
  data() {
    return { canvas: null };
  },
  methods: {
    async onFileUpload(evt) {
      const files = [...evt.target.files];
      let promises = [];
      files.forEach((file) =>
        promises.push(
          this.$imutils.readFile(file).then((url) => {
            if (this.crop) {
              return this.$imutils.cropImage(url, {
                cropWidth: this.cropResolution.width,
                cropHeight: this.cropResolution.height,
                imageFormat: this.imageFormat,
              });
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
