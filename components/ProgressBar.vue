<template>
  <div
    class="
      flex
      items-center
      justify-center
      w-full
      h-5
      rounded
      overflow-hidden
      bg-gray-500
      relative
      select-none
    "
  >
    <div
      class="
        absolute
        left-0
        w-full
        h-5
        transition-transform
        duration-100
        bg-gray-800
        rounded
      "
      :style="translateX"
    ></div>
    <span class="z-10 text-xs">{{ current }} / {{ max }}</span>
  </div>
</template>
<script>
export default {
  props: {
    current: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 1,
    },
    percentage: {
      type: Boolean,
      default: false,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    translateX() {
      const percentage = 100 - (this.current / this.max) * 100;
      return `transform: translateX(-${percentage}%)`;
    },
  },
};
</script>
