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
      relative
      select-none
    "
    :class="wrapperClass"
  >
    <div
      class="
        absolute
        left-0
        w-full
        h-5
        transition-transform
        duration-100
        rounded
      "
      :class="progressClass"
      :style="translateX"
    ></div>
    <span class="z-10 text-xs">{{ label }}</span>
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
    wrapperClass: {
      type: String,
      default: "bg-gray-300 dark:bg-gray-500",
    },
    progressClass: {
      type: String,
      default: "bg-gray-400 dark:bg-gray-800",
    },
  },
  computed: {
    translateX() {
      const percentage = 100 - (this.current / this.max) * 100;
      return `transform: translateX(-${percentage}%)`;
    },
    label() {
      if (this.percentage) {
        return `${((this.current / this.max) * 100).toFixed(1)}%`;
      } else {
        return `${this.current.toFixed(0)} / ${this.max.toFixed(0)}`;
      }
    },
  },
};
</script>
