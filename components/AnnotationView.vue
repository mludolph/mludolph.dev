<template>
  <div class="flex flex-col w-full h-full items-center justify-center">
    <img :src="value.src" class="h-full max-h-full max-w-full" />
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>
