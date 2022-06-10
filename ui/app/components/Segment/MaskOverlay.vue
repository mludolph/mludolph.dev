<template>
  <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" />
</template>

<script>
export default {
  props: {
    canvasWidth: Number,
    canvasHeight: Number,
    img: ImageData,
  },
  watch: {
    img: {
      handler: function (newVal) {
        this.$nextTick().then(() => {
          const canvas = this.$refs.canvas;
          const ctx = canvas.getContext("2d");
          ctx.putImageData(newVal, 0, 0);
        });
      },
      immediate: true,
    },
  },
};
</script>
