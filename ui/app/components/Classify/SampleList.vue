<template>
  <div
    class="flex flex-row overflow-scroll gap-3 select-none min-w-0"
    :class="{
      'flex-wrap': !horizontal,
    }"
    :style="{
      'margin-bottom: -6px': horizontal,
      'margin-right: -6px': !horizontal,
    }"
  >
    <t-modal ref="sampleModal">
      <img :src="preview" class="rounded w-64 h-64" />
    </t-modal>
    <div
      v-for="(sample, idx) in value"
      :key="'sample' + idx"
      class="relative group"
      style="width: 64px; height: 64px; min-height: 64px; min-width: 64px"
    >
      <font-awesome-icon
        :icon="['fas', 'trash']"
        class="
          hidden
          group-hover:block
          absolute
          top-2
          left-2
          hover:text-gray-500
          cursor-pointer
          z-40
        "
        @click="$emit('delete', idx)"
      ></font-awesome-icon>
      <img
        :src="sample"
        class="rounded cursor-pointer"
        @click="
          preview = sample;
          $refs.sampleModal.show();
        "
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: null,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      preview: null,
    };
  },
};
</script>
