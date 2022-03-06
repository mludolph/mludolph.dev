<template>
  <div class="flex flex-col flex-1 mt-4 h-full">
    <section
      class="
        flex flex-col flex-grow
        container
        max-w-content
        m-auto
        mb-4
        h-full
        items-center
        justify-center
      "
    >
      <span class="font-semibold text-lg"
        >Oops, this page does not exist :(</span
      >
      <span class="text-xs text-gray-600 uppercase"
        >Error Code: {{ error.statusCode }}</span
      >
    </section>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error", // you can set a custom layout for the error page
};
</script>
