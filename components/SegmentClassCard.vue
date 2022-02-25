<template>
  <div
    class="flex flex-col bg-gray-700 rounded gap-3 py-2 cursor-pointer"
    @click="$emit('select')"
  >
    <div class="flex flex-row items-center justify-between gap-3 px-3">
      <div class="flex flex-row items-center gap-2">
        <span v-if="!edit" class="text-sm select-none">{{ value.name }}</span>
        <input
          ref="nameEditor"
          v-if="edit"
          class="text-sm bg-gray-200 dark:bg-gray-600 w-20"
          :value="value.name"
          @input="updateName"
          @blur="onBlur"
          @keyup.enter="onBlur"
        />
        <font-awesome-icon
          :icon="['fas', 'pencil']"
          class="text-sm text-gray-400 hover:text-gray-500 cursor-pointer"
          @click.stop="makeEditable"
        ></font-awesome-icon>
      </div>

      <div class="flex flex-row gap-2 relative">
        <input
          type="color"
          :value="value.color"
          @input="updateColor"
          @click.stop=""
        />
        <font-awesome-icon
          :icon="['fas', 'trash']"
          class="cursor-pointer hover:text-gray-500"
          @click.stop="removeClass"
        ></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      edit: false,
      editColor: false,
      previousName: "",
    };
  },
  methods: {
    openColorPicker() {
      this.editColor = true;
    },
    closeColorPicker() {
      this.editColor = false;
    },
    updateColor(evt) {
      this.$emit("input", {
        ...this.value,
        color: evt.target.value,
      });
    },
    updateName(evt) {
      this.$emit("input", {
        ...this.value,
        name: evt.target.value,
      });
    },
    onBlur() {
      if (this.value.name === "") {
        this.$emit("input", {
          ...this.value,
          name: this.previousName,
        });
      }
      this.edit = false;
    },
    makeEditable() {
      this.previousName = this.value.name;
      this.edit = !this.edit;
      this.$nextTick().then(() => {
        this.$refs.nameEditor.focus();
      });
    },
    removeClass() {
      this.$emit("remove");
    },
  },
};
</script>

<style lang="postcss">
input[type="color"] {
  @apply appearance-none border-none w-4 h-4 rounded-full cursor-pointer overflow-hidden;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  @apply p-0;
}
input[type="color"]::-webkit-color-swatch {
  @apply border-none;
}
</style>
