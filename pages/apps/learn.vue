<template>
  <div class="flex flex-row gap-12 pl-48 pr-24">
    <button
      v-if="!menuVisible"
      class="
        fixed
        top-24
        left-0
        p-2
        bg-gray-900
        hover:bg-gray-500
        rounded-r-lg
        text-sm
      "
      @click="menuVisible = true"
    >
      <font-awesome-icon
        :icon="['fas', 'angle-right']"
        class="w-3"
      ></font-awesome-icon>
    </button>
    <div
      class="
        fixed
        flex flex-col
        left-0
        top-24
        bg-gray-900
        rounded-r-xl
        transition-transform
        duration-200
        transform
        overflow-hidden
        text-sm
      "
      :class="{ '-translate-x-full': !menuVisible }"
    >
      <button
        class="px-2 py-2 text-left hover:bg-gray-500"
        @click="menuVisible = false"
      >
        <font-awesome-icon
          :icon="['fas', 'angle-left']"
          class="w-4"
        ></font-awesome-icon>
      </button>
      <button
        class="
          flex flex-row
          items-center
          hover:bg-gray-500
          px-2
          py-2
          gap-3
          whitespace-nowrap
        "
      >
        <font-awesome-icon
          :icon="['fas', 'plus']"
          class="w-4"
        ></font-awesome-icon>
        <span>New Project</span>
      </button>
      <button
        class="
          flex flex-row
          items-center
          hover:bg-gray-500
          px-2
          py-2
          gap-3
          whitespace-nowrap
        "
      >
        <font-awesome-icon
          :icon="['fab', 'google-drive']"
          class="w-4"
        ></font-awesome-icon>
        <span>Open from Drive</span>
      </button>
      <button
        class="
          flex flex-row
          items-center
          hover:bg-gray-500
          px-2
          py-2
          gap-3
          whitespace-nowrap
        "
      >
        <font-awesome-icon
          :icon="['far', 'floppy-disk']"
          class="w-4"
        ></font-awesome-icon>
        <span>Save to Drive</span>
      </button>

      <button
        class="
          flex flex-row
          items-center
          hover:bg-gray-500
          px-2
          py-2
          gap-3
          whitespace-nowrap
        "
      >
        <font-awesome-icon
          :icon="['fas', 'folder']"
          class="w-4"
        ></font-awesome-icon>
        <span>Open from File</span>
      </button>
      <button
        class="
          flex flex-row
          items-center
          hover:bg-gray-500
          px-2
          py-2
          gap-3
          whitespace-nowrap
        "
      >
        <font-awesome-icon
          :icon="['fas', 'download']"
          class="w-4"
        ></font-awesome-icon>
        <span>Save to File</span>
      </button>
    </div>

    <div class="flex flex-col flex-grow gap-6 mt-8 mb-8">
      <class-card
        v-for="(cls, index) in classes"
        :key="index"
        v-model="classes[index]"
        @delete="deleteClass"
      ></class-card>
      <div
        class="
          flex flex-col
          items-center
          justify-center
          border-b border-r border-l border-dashed border-gray-500
          rounded-lg
          shadow-md
          w-full
          cursor-pointer
          hover:text-gray-400
          py-3
        "
        @click="createClass"
      >
        <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
        <span>Add a class</span>
      </div>
    </div>
    <div class="flex flex-col flex-grow-0 w-48">
      <div class="flex flex-col bg-gray-700 rounded-lg shadow-md sticky top-8">
        <div class="flex flex-row px-6 py-3">
          <h2 class="text-lg font-semibold">Training</h2>
        </div>
        <hr class="bg-gray-500" />
        <div class="flex flex-col px-6 py-3">
          <button
            class="bg-gray-500 hover:bg-gray-600 rounded py-2 whitespace-nowrap"
          >
            Train Model
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col flex-grow-0 w-80">
      <div class="flex bg-gray-700 rounded-lg shadow-md sticky top-8">
        <div
          class="
            flex flex-row
            w-full
            items-center
            justify-between
            gap-3
            px-6
            py-3
          "
        >
          <h2 class="text-lg font-semibold">Preview</h2>
          <button
            class="
              bg-gray-500
              hover:bg-gray-600
              rounded
              px-4
              py-2
              whitespace-nowrap
            "
          >
            Export Model
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "minimal",
  data() {
    return {
      menuVisible: false,
      classes: [
        {
          id: 1,
          title: "Class 1",
          samples: [],
        },
      ],
    };
  },
  methods: {
    createClass() {
      const id = this.classes.length + 1;
      this.classes.push({
        id: id,
        title: "Class " + id,
        samples: [],
      });
    },
    deleteClass(deletedId) {
      const idx = this.classes.findIndex(({ id }) => id == deletedId);
      if (idx != -1) {
        this.$delete(this.classes, idx);
      }
    },
  },
};
</script>
