<template>
  <div
    class="
      flex flex-col
      bg-gray-100
      dark:bg-gray-700
      rounded-lg
      shadow-md
      overflow-hidden
    "
  >
    <div class="flex flex-row w-full justify-between items-center px-6 py-3">
      <div class="flex flex-row items-center gap-3">
        <h2 v-if="!edit" class="text-lg font-semibold">{{ value.title }}</h2>
        <input
          ref="titleEditor"
          v-if="edit"
          class="text-lg font-semibold bg-gray-200 dark:bg-gray-600"
          :value="value.title"
          @input="updateTitle"
          @blur="onBlur"
          @keyup.enter="onBlur"
        />
        <font-awesome-icon
          :icon="['fas', 'pencil']"
          class="text-gray-400 hover:text-gray-500 cursor-pointer"
          @click="makeEditable"
        ></font-awesome-icon>
      </div>
      <font-awesome-icon
        :icon="['fas', 'trash']"
        class="text-gray-400 hover:text-gray-500 cursor-pointer"
        @click="$emit('delete')"
      ></font-awesome-icon>
    </div>
    <hr class="bg-gray-500" />

    <div class="flex flex-col px-6 py-3 gap-3" v-if="!webcam && !upload">
      <div class="flex flex-row w-full items-center gap-2">
        <span v-if="value.samples.length > 0" class="font-semibold"
          >Samples: {{ value.samples.length }}</span
        >
        <span v-else class="font-semibold">Add samples to the class</span>

        <font-awesome-icon
          v-if="value.samples.length > 0"
          :icon="['fas', 'download']"
          class="text-gray-400 hover:text-gray-500 cursor-pointer"
          @click="downloadSamples"
        ></font-awesome-icon>

        <font-awesome-icon
          v-if="value.samples.length > 0"
          :icon="['fas', 'trash']"
          class="text-gray-400 hover:text-gray-500 cursor-pointer"
          @click="$emit('clearSamples')"
        ></font-awesome-icon>
      </div>
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="flex flex-row gap-3">
          <button
            class="
              flex flex-col flex-shrink-0
              justify-center
              items-center
              gap-2
              bg-gray-200
              hover:bg-gray-300
              dark:bg-gray-500 dark:hover:bg-gray-600
              rounded
              w-20
              h-16
              p-2
            "
            @click="webcam = true"
          >
            <font-awesome-icon :icon="['fas', 'video']"></font-awesome-icon>
            <span class="text-xs">Webcam</span>
          </button>
          <button
            class="
              flex flex-col flex-shrink-0
              justify-center
              items-center
              gap-2
              bg-gray-200
              hover:bg-gray-300
              dark:bg-gray-500 dark:hover:bg-gray-600
              rounded
              w-20
              h-16
              p-2
            "
            @click="upload = true"
          >
            <font-awesome-icon :icon="['fas', 'upload']"></font-awesome-icon>
            <span class="text-xs">Upload</span>
          </button>
        </div>
        <sample-list
          :value="value.samples"
          :horizontal="true"
          @delete="$emit('deleteSample', $event)"
        ></sample-list>
      </div>
    </div>
    <div
      v-if="webcam || upload"
      class="
        flex flex-col
        sm:grid sm:grid-cols-2
        lg:flex lg:flex-col
        xl:grid xl:grid-cols-2
        h-[600px]
        max-h-[600px]
        sm:max-h-[400px] sm:h-[400px]
        lg:max-h-[600px] lg:h-[600px]
        xl:max-h-[400px] xl:h-[400px]
      "
    >
      <div
        class="flex flex-col col-span-1 gap-2 bg-gray-200 dark:bg-gray-600 p-2"
      >
        <div class="flex flex-row justify-between">
          <span class="text-sm font-semibold">{{
            webcam ? "Webcam" : "Upload"
          }}</span>

          <font-awesome-icon
            :icon="['fas', 'xmark']"
            class="text-gray-400 hover:text-gray-500 cursor-pointer"
            @click="closeWebcamOrUpload"
          ></font-awesome-icon>
        </div>
        <div v-if="webcam" class="flex flex-col items-center gap-3">
          <t-select
            placeholder="Select a webcam"
            :options="cameras"
            value-attribute="deviceId"
            text-attribute="label"
            @input="onCameraSelect($event)"
          ></t-select>
          <webcam
            ref="webcam"
            :deviceId="selectedCameraId"
            @cameras="onCameraLoad($event)"
            @video-live="webcamReady = true"
            @stopped="webcamReady = false"
          ></webcam>
          <button
            v-if="webcamReady"
            class="
              flex flex-row
              gap-2
              w-full
              bg-gray-700
              hover:bg-gray-800
              rounded
              items-center
              justify-center justify-self-end
              whitespace-nowrap
              select-none
              py-2
            "
            @mousedown="startCapture()"
            @mouseup="stopCapture()"
            @click="singleCapture()"
          >
            <font-awesome-icon :icon="['fas', 'circle']"></font-awesome-icon>
            <span class="whitespace-nowrap">Hold to Capture</span>
          </button>
        </div>
        <div v-if="upload" class="flex flex-col h-full">
          <drag-upload-image
            @files="onFileUpload"
            class="w-full h-full"
          ></drag-upload-image>
        </div>
      </div>
      <div class="flex flex-col col-span-1 p-2 gap-2 overflow-hidden">
        <span class="text-sm font-semibold"
          >Samples: {{ value.samples.length }}</span
        >
        <sample-list
          :value="value.samples"
          @delete="$emit('deleteSample', $event)"
        ></sample-list>
      </div>
    </div>
  </div>
</template>
<script>
import * as FileSaver from "file-saver";
import JSZip from "jszip";
import slugify from "slugify";

export default {
  props: ["value"],
  data() {
    return {
      edit: false,
      webcam: false,
      upload: false,
      cameras: [],
      selectedCameraId: null,
      timer: null,
      webcamReady: false,
    };
  },
  methods: {
    emitUpdate(update) {
      this.$emit("input", {
        ...this.value,
        ...update,
      });
    },
    updateTitle(evt) {
      this.emitUpdate({ title: evt.target.value });
    },
    onBlur() {
      if (this.value.title === "") {
        this.emitUpdate({
          title: "Class " + this.value.id,
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
    closeWebcamOrUpload() {
      if (this.webcam) {
        this.$refs.webcam.stop();
        this.webcam = false;
        this.webcamReady = false;
      } else if (this.upload) {
        this.upload = false;
      }
    },
    onCameraLoad(cameras) {
      this.cameras = cameras;
      this.$nextTick().then(() => {
        if (this.cameras.length > 0) {
          this.selectedCameraId = this.cameras[0].deviceId;
          this.$refs.webcam.changeCamera(this.selectedCameraId);
        }
      });
    },
    onCameraSelect(deviceId) {
      this.selectedCameraId = deviceId;
    },
    startCapture() {
      this.timer = setInterval(async () => {
        const img = await this.$refs.webcam.capture();
        this.$emit("addSample", img);
      }, 1000.0 / 24);
    },
    stopCapture() {
      clearInterval(this.timer);
      this.timer = null;
    },
    async singleCapture() {
      const img = await this.$refs.webcam.capture();
      this.$emit("addSample", img);
    },
    onFileUpload(files) {
      files.forEach((img) => this.$emit("addSample", img));
    },
    downloadSamples() {
      var zip = new JSZip();
      this.value.samples.forEach((sample, idx) =>
        zip.file(`${idx}.jpg`, sample.split("base64,")[1], { base64: true })
      );

      zip.generateAsync({ type: "blob" }).then((content) => {
        FileSaver.saveAs(
          content,
          `${slugify(this.value.title, { replacement: "_", lower: true })}.zip`
        );
      });
    },
  },
};
</script>

<style lang="postcss"></style>
