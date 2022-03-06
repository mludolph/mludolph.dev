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
        :to="demo.to"
        >{{ demo.title }}</NuxtLink
      >
      <p class="block text-gray-800 dark:text-gray-400 text-sm pb-2">
        {{ demo.description }}
      </p>
      <nuxt-link
        class="
          rounded
          px-3
          py-2
          text-center
          whitespace-nowrap
          font-semibold
          text-sm text-gray-100
          bg-indigo-400
          hover:bg-indigo-300
          dark:hover:bg-indigo-500
        "
        :to="demo.to"
      >
        Get started
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  props: { demo: { type: Object, default: () => {} } },
};
</script>
