<template>
  <div
    class="
      absolute
      top-0
      flex flex-row
      items-center
      min-h-screen
      w-full
      gap-12
      pl-48
      pr-24
    "
  >
    <button
      v-if="!menuVisible"
      class="
        fixed
        top-28
        left-0
        p-2
        bg-gray-100
        hover:bg-gray-300
        dark:bg-gray-900 dark:hover:bg-gray-500
        shadow
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
        top-28
        shadow-md
        bg-gray-100
        dark:bg-gray-900
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
        class="px-2 py-2 text-left hover:bg-gray-300 dark:hover:bg-gray-600"
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
          hover:bg-gray-300
          dark:hover:bg-gray-600
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
      <!--
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
      -->
      <button
        class="
          flex flex-row
          items-center
          hover:bg-gray-300
          dark:hover:bg-gray-600
          px-2
          py-2
          gap-3
          whitespace-nowrap
          relative
        "
      >
        <input
          class="absolute top-0 bottom-0 left-0 right-0 opacity-0"
          type="file"
          @change="onLoadFromFile"
          accept=".zip"
        />
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
          hover:bg-gray-300
          dark:hover:bg-gray-600
          px-2
          py-2
          gap-3
          whitespace-nowrap
        "
        @click="onSaveToFile"
      >
        <font-awesome-icon
          :icon="['fas', 'download']"
          class="w-4"
        ></font-awesome-icon>
        <span>Save to File</span>
      </button>
    </div>

    <div class="flex flex-col flex-grow gap-6 mt-8 mb-8 w-card">
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
    <div class="flex flex-col h-screen max-h-screen relative">
      <div
        class="
          flex flex-col
          bg-gray-100
          dark:bg-gray-700
          rounded-lg
          shadow-md
          w-48
          sticky
          top-1/2
          transform
          -translate-y-1/2
        "
      >
        <div class="flex flex-row px-6 py-3">
          <h2 class="text-lg font-semibold">Training</h2>
        </div>
        <hr class="bg-gray-500" />
        <div class="flex flex-col gap-3 px-6 py-3">
          <button
            class="
              bg-gray-200
              dark:bg-gray-500
              disabled:bg-gray-400
              disabled:text-gray-500
              disabled:dark:bg-gray-400
              disabled:dark:text-gray-500
              hover:bg-gray-300
              dark:hover:bg-gray-600
              disabled:cursor-default
              rounded
              px-4
              py-2
              whitespace-nowrap
            "
            :disabled="!canTrain || (training.started && !training.finished)"
            @click="trainModel"
          >
            {{ training.finished ? "Re-train Model" : "Train Model" }}
          </button>
          <div
            class="flex flex-col gap-2"
            :class="{ hidden: !training.started }"
          >
            <span class="text-sm font-semibold">{{ training.status }}</span>
            <progress-bar
              :current="training.currentEpoch"
              :max="training.maxEpoch"
            ></progress-bar>
            <span class="text-xs"
              >Loss:
              {{
                training.trainLosses.length > 0
                  ? `${training.trainLosses[
                      training.trainLosses.length - 1
                    ].toFixed(3)} (${training.valLosses[
                      training.valLosses.length - 1
                    ].toFixed(3)})`
                  : "n/a"
              }}
            </span>
            <activity-indicator
              class="h-6"
              :height="20"
              :chart-data="chartDataCollection"
              :options="chartOptions"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col h-screen max-h-screen relative">
      <div
        class="
          flex flex-col
          bg-gray-100
          dark:bg-gray-700
          rounded-lg
          shadow-md
          overflow-hidden
          sticky
          w-80
          top-1/2
          transform
          -translate-y-1/2
        "
      >
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
          <!--
          <button
            class="
              bg-gray-500
              disabled:bg-gray-400
              disabled:text-gray-500
              disabled:cursor-default
              hover:bg-gray-600
              rounded
              px-4
              py-2
              whitespace-nowrap
            "
            :disabled="!training.finished"
          >
            <font-awesome-icon :icon="['fas', 'download']"></font-awesome-icon>
            <span>Export Model</span>
          </button>
          -->
        </div>
        <template v-if="training.finished">
          <hr class="bg-gray-500" />
          <div class="flex flex-col">
            <div class="grid grid-cols-2">
              <button
                class="
                  flex flex-row
                  justify-center
                  items-center
                  gap-2
                  text-sm
                  hover:bg-gray-300
                  dark:hover:bg-gray-500
                  w-full
                  py-3
                "
                :class="{ 'bg-gray-200 dark:bg-gray-600': webcam }"
                @click="openWebcam()"
              >
                <font-awesome-icon :icon="['fas', 'video']"></font-awesome-icon>
                <span class="text-xs">Webcam</span>
              </button>
              <button
                class="
                  flex flex-row
                  justify-center
                  items-center
                  gap-2
                  text-sm
                  hover:bg-gray-300
                  dark:hover:bg-gray-500
                  w-full
                  py-3
                "
                :class="{ 'bg-gray-200 dark:bg-gray-600': upload }"
                @click="openUpload()"
              >
                <font-awesome-icon
                  :icon="['fas', 'upload']"
                ></font-awesome-icon>
                <span class="text-xs">File</span>
              </button>
            </div>

            <div
              class="
                flex flex-col
                gap-2
                items-center
                bg-gray-200
                dark:bg-gray-600
                px-6
                py-3
              "
              :class="{ hidden: !webcam }"
            >
              <div class="flex flex-row gap-3">
                <div class="flex flex-row gap-2 items-center">
                  <span class="text-sm">Live </span>
                  <t-toggle
                    v-model="webcamLive"
                    @change="onWebcamLiveToggle"
                  ></t-toggle>
                </div>
                <t-select
                  placeholder="Select a webcam"
                  :options="cameras"
                  value-attribute="deviceId"
                  text-attribute="label"
                  @input="onCameraSelect"
                ></t-select>
              </div>
              <webcam
                ref="webcam"
                :deviceId="selectedCameraId"
                @cameras="onCameraLoad"
                @video-live="webcamReady = true"
                @stopped="webcamReady = false"
              ></webcam>
            </div>
            <div
              class="
                flex flex-col
                gap-2
                items-center
                bg-gray-200
                dark:bg-gray-600
                px-6
                py-3
              "
              :class="{ hidden: !upload }"
            >
              <drag-upload-image
                @files="onFileUpload"
                class="w-full h-32"
              ></drag-upload-image>

              <img
                class="rounded w-64 h-64"
                :src="sample"
                :class="{ hidden: sample === null }"
              />
            </div>
          </div>
          <hr class="bg-gray-500" />
          <div class="flex flex-col gap-2 px-6 py-3">
            <div
              v-for="(cls, index) in classes"
              :key="index"
              class="flex flex-row gap-2 items-center"
            >
              <span class="text-sm w-20">{{ cls.title }}</span>
              <progress-bar
                :current="predictions !== null ? predictions[index] : 0"
                :percentage="true"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import MobileNet from "~/plugins/mobilenet";
import * as FileSaver from "file-saver";
import JSZip from "jszip";
import slugify from "slugify";

export default {
  layout: "minimal",
  data() {
    return {
      menuVisible: false,

      cameras: [],
      selectedCameraId: null,
      webcamReady: false,
      webcam: false,
      webcamLive: false,
      upload: false,
      sample: null,
      predictions: null,

      training: {
        status: "",
        started: false,
        finished: false,
        currentEpoch: 0,
        maxEpoch: 50,
        epochs: [],
        valLosses: [],
        trainLosses: [],
      },
      model: null,
      classes: [
        {
          id: 1,
          title: "Class 1",
          samples: [],
        },
        {
          id: 2,
          title: "Class 2",
          samples: [],
        },
      ],
      chartDataCollection: null,
      chartOptions: {
        layout: { padding: 1 },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: false,
              ticks: {
                display: false,
              },
              gridLines: {
                border: true,
                lineWidth: 0,
              },
            },
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.updateTrainingData();
  },
  computed: {
    canTrain() {
      const numValidClasses = this.classes.reduce((cum, curr) => {
        return cum + (curr.samples.length > 0 ? 1 : 0);
      }, 0);
      return numValidClasses >= 2;
    },
    predictions() {
      if (this.training.finished) {
        return this.model.predict(this.sample);
      }
      return null;
    },
  },
  watch: {
    webcamLive: function (newVal, oldVal) {
      if (this.webcamLive) {
        window.requestAnimationFrame(this.predictWebcam);
      }
    },
  },
  methods: {
    updateTrainingData() {
      this.chartDataCollection = {
        labels: this.training.epochs,
        datasets: [
          {
            tension: 0.2,
            fill: false,
            pointRadius: 0,
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 2,
            data: this.training.trainLosses,
          },
          {
            tension: 0.2,
            fill: false,
            pointRadius: 0,
            borderColor: "rgb(175, 192, 192)",
            borderWidth: 2,
            data: this.training.valLosses,
          },
        ],
      };
    },
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
    async trainModel() {
      this.model = new MobileNet(this.classes.length);
      this.training.currentEpoch = 0;
      this.training.trainLosses = [];
      this.training.valLosses = [];

      this.training.started = true;
      this.training.status = "Loading model...";
      this.results = await this.model.create().then(() => {
        this.training.status = "Loading data...";
        return this.model.finetune(
          this.classes,
          (args) => {
            console.log(args);
            this.training.status = "Training model...";
          },
          (batch, logs) => {},
          (epoch, logs) => {
            console.log(logs);
            this.training.currentEpoch = epoch + 1;
            this.training.epochs.push(epoch);
            this.training.trainLosses.push(logs.loss);
            this.training.valLosses.push(logs.val_loss);
            this.updateTrainingData();
          }
        );
      });
      this.training.status = "Training finished!";
      this.training.finished = true;

      this.$nextTick().then(() => this.openWebcam());
    },
    openWebcam() {
      this.sample = null;
      this.upload = false;

      this.$refs.webcam.start();
      this.webcam = true;
      this.webcamLive = true;
    },
    openUpload() {
      this.sample = null;
      this.webcam = false;
      this.webcamLive = false;
      this.$refs.webcam.stop();

      this.upload = true;
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
    onWebcamLiveToggle(live) {
      if (live) {
        this.$refs.webcam.resume();
      } else {
        this.$refs.webcam.pause();
      }
    },
    async onFileUpload(files) {
      this.sample = files[0];
      await this.predict();
    },

    predictWebcam() {
      this.predict().then(() => {
        if (this.webcamReady) {
          this.sample = this.$refs.webcam.capture();
        }

        if (this.webcamLive) {
          window.requestAnimationFrame(this.predictWebcam);
        } else {
          this.sample = null;
          this.predictions = null;
        }
      });
    },
    async predict() {
      if (this.model !== null && this.sample !== null) {
        this.predictions = await this.model.predict(this.sample);
      } else {
        this.predictions = null;
      }
    },

    async onSaveToFile() {
      var zip = new JSZip();
      let meta = { classes: [], model: false };
      this.classes.forEach((cls) => {
        meta.classes.push({ id: cls.id, title: cls.title });
        const folder = zip.folder(cls.title);
        cls.samples.forEach((sample, idx) => {
          folder.file(`${idx}.jpg`, sample.split("base64,")[1], {
            base64: true,
          });
        });
      });

      if (this.training.finished) {
        meta.model = true;
        await this.model
          .save()
          .then((json) => JSON.stringify(json))
          .then((json) => zip.file("model.json", json));
      }
      zip.file("meta.json", JSON.stringify(meta));

      zip.generateAsync({ type: "blob" }).then((content) => {
        FileSaver.saveAs(content, `project.zip`);
      });
    },
    readFile(file) {
      const reader = new FileReader();

      return new Promise((resolve) => {
        reader.onload = (ev) => {
          resolve(ev.target.result);
        };
        reader.readAsArrayBuffer(file);
      });
    },
    resetTraining() {
      this.training = {
        status: "",
        started: false,
        finished: false,
        currentEpoch: 0,
        maxEpoch: 50,
        epochs: [],
        valLosses: [],
        trainLosses: [],
      };
    },
    onLoadFromFile(evt) {
      this.resetTraining();
      const file = [...evt.target.files][0];

      this.readFile(file)
        .then((blob) => JSZip.loadAsync(blob))
        .then(async (zip) => {
          const meta = await zip
            .file("meta.json")
            .async("string")
            .then((str) => JSON.parse(str));

          this.classes = [];
          await meta.classes.forEach(async ({ id, title }) => {
            const cls = { id, title, samples: [] };
            const promises = [];
            zip.folder(title).forEach((relativePath, file) => {
              promises.push(
                file.async("base64").then((base64) => {
                  cls.samples.push("data:image/jpeg;base64," + base64);
                })
              );
            });
            await Promise.all(promises);
            this.classes.push(cls);
          });

          if (meta.model) {
            await zip
              .file("model.json")
              .async("string")
              .then(async (str) => {
                const json = JSON.parse(str);
                this.model = new MobileNet(this.classes.length);
                await this.model.load(json);
                this.training.status = "Training finished!";
                this.training.finished = true;

                this.$nextTick().then(() => this.openWebcam());
              });
          }
        });
    },
    onSaveToDrive() {},
    onLoadFromDrive() {},
  },
};
</script>

<style lang="postcss">
.w-card {
  width: 600px;
  max-width: 600px;
  min-width: 600px;
}
</style>
