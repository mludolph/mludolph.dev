<template>
  <div class="flex bg-gray-700 rounded-lg shadow-md w-full">
    <div class="flex flex-row w-full justify-between items-center px-6 py-3">
      <div class="flex flex-row items-center gap-3">
        <h2 v-if="!edit" class="text-lg font-semibold">{{ value.title }}</h2>
        <input
          ref="titleEditor"
          v-if="edit"
          class="text-lg font-semibold bg-gray-600"
          :value="value.title"
          @input="updateTitle"
          @blur="onBlur"
          @keyup.enter="onBlur"
        />
        <font-awesome-icon
          :icon="['fas', 'pencil-alt']"
          class="text-gray-400 hover:text-gray-500 cursor-pointer"
          @click="makeEditable"
        ></font-awesome-icon>
      </div>
      <font-awesome-icon
        :icon="['fas', 'trash']"
        class="text-gray-400 hover:text-gray-500 cursor-pointer"
        @click="onDelete"
      ></font-awesome-icon>
    </div>
    <hr class="bg-gray-500" />
  </div>
</template>
<script>
export default {
  props: ["value"],
  data() {
    return { edit: false };
  },
  methods: {
    updateTitle(evt) {
      this.$emit("input", {
        id: this.value.id,
        title: evt.target.value,
        samples: this.value.samples,
      });
    },
    onBlur() {
      if (this.value.title === "") {
        this.$emit("input", {
          id: this.value.id,
          title: "Class " + this.value.id,
          samples: this.value.samples,
        });
      }
      this.edit = false;
    },
    makeEditable() {
      this.edit = !this.edit;
      this.$nextTick().then(() => {
        const titleEditorRef = this.$refs.titleEditor;
        titleEditorRef.focus();
      });
    },
    onDelete(){
        this.$emit('delete', this.value.id);
    }
  },
};
</script>
