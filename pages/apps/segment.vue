<template>
  <div
    class="flex flex-row w-screen min-w-screen max-w-screen max-h-screen gap-6"
  >
    <div
      class="
        flex flex-col
        h-screen
        min-h-screen
        max-h-screen
        overflow-scroll
        pt-32
        px-4
        w-64
      "
    >
      <div class="flex flex-col gap-3">
        <h2 class="font-semibold">Classes</h2>
        <segment-class-card
          v-for="(cls, idx) in classes"
          :key="idx"
          v-model="classes[idx]"
          @remove="removeClass(idx)"
        />
        <div
          class="
            flex flex-col
            border-b border-x border-gray-600 border-dashed
            hover:text-gray-500
            items-center
            justify-center
            cursor-pointer
            rounded
            p-3
          "
          @click="addClass()"
        >
          <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
        </div>
      </div>
    </div>
    <div
      class="
        flex flex-col
        h-screen
        min-h-screen
        max-w-screen max-h-screen
        w-full
        pt-8
        pr-8
      "
    >
      <div class="flex flex-row w-full py-2 justify-end">
        <button
          class="
            flex flex-col
            items-center
            justify-center
            text-gray-300
            bg-gray-600
            hover:bg-gray-700
            w-6
            h-6
            rounded
          "
          v-if="annotationView"
          @click="annotationView = false"
        >
          <font-awesome-icon :icon="['fas', 'grip']" />
        </button>
        <button
          class="
            flex flex-col
            items-center
            justify-center
            text-gray-300
            bg-gray-600
            hover:bg-gray-700
            disabled:bg-gray-600 disabled:text-gray-500
            w-6
            h-6
            rounded
          "
          :disabled="samples.length === 0"
          v-else
          @click="annotationView = true"
        >
          <font-awesome-icon :icon="['fas', 'crop-simple']" />
        </button>
      </div>
      <annotation-view
        v-if="annotationView"
        v-model="samples[selectedSampleId]"
      />
      <div v-else class="flex flex-row flex-wrap w-full h-full gap-3">
        <div
          v-for="(sample, i) in samples"
          :key="i"
          class="
            flex flex-col
            items-center
            justify-center
            w-32
            h-32
            group
            relative
          "
        >
          <font-awesome-icon
            :icon="['fas', 'trash']"
            class="
              absolute
              right-1
              top-1
              hidden
              group-hover:block
              text-gray-300
              hover:text-gray-400
              cursor-pointer
              z-40
            "
            @click="$delete(samples, i)"
          />
          <img
            :src="sample.src"
            class="rounded shadow cursor-pointer"
            :class="{
              'outline outline-2 outline-offset-2 outline-blue-400':
                sample.annotations !== null,
            }"
            @click="openAnnotationView(i)"
          />
        </div>

        <drag-upload-image
          @files="onFileUpload"
          :crop="false"
          label="Add image"
          class="w-32 h-32"
        ></drag-upload-image>
      </div>
      <div class="flex flex-row"></div>
    </div>
  </div>
</template>

<script>
import * as randomColor from "random-material-color";

export default {
  layout: "minimal",
  data() {
    return {
      menuVisible: false,
      annotationView: false,
      selectedSampleId: 0,
      classes: [],
      samples: [],
    };
  },
  mounted() {},
  watch: {},
  methods: {
    openAnnotationView(i) {
      this.selectedSampleId = i;
      this.annotationView = true;
    },
    onFileUpload(files, names) {
      files.forEach((file, idx) =>
        this.samples.push({ name: names[idx], src: file, annotations: null })
      );
    },
    generateColor() {
      return randomColor.getColor();
    },
    addClass() {
      const cls = {
        name: "Class " + (this.classes.length + 1),
        color: this.generateColor(),
      };
      this.classes.push(cls);
    },
    removeClass(idx) {
      this.$delete(this.classes, idx);
    },
  },
};
</script>

<style lang="postcss">
.vc-chrome {
  @apply bg-transparent rounded overflow-hidden shadow !important;
}
.vc-chrome-body {
  @apply dark:bg-gray-700;
}
</style>
