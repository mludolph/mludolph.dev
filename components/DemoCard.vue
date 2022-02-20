<template>
  <div
    class="
      flex flex-col
      justify-between
      h-full
      border border-gray-300
      dark:border-gray-700
      rounded
      pb-4
      box-border
    "
  >
    <slot></slot>
    <div class="flex flex-col px-4 pt-2">
      <NuxtLink
        class="
          flex
          text-indigo-400
          hover:text-indigo-500
          active:text-indigo-500
          font-semibold
          leading-none
          w-content
          mt-2
          mb-4
        "
        to="/apps/classify"
        >{{ demo.title }}</NuxtLink
      >
      <p class="block text-gray-800 dark:text-gray-400 text-sm">
        {{ demo.description }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: { demo: { type: Object, default: () => {} } },
};
</script>
