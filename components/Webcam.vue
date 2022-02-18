<template>
  <div
    class="
      flex flex-row
      items-center
      justify-center
      rounded-lg
      overflow-hidden
      relative
    "
  >
    <font-awesome-icon
      v-if="ready"
      :icon="['fas', 'sync']"
      class="absolute top-4 right-4 hover:text-gray-500 cursor-pointer z-40"
      @click="flip = !flip"
    ></font-awesome-icon>
    <video
      ref="video"
      :src="source"
      :autoplay="autoplay"
      :playsinline="playsinline"
      class="w-64 h-64 object-cover object-center"
      :class="{ flip: flip }"
    />
  </div>
</template>

<script>
export default {
  props: {
    autoplay: {
      type: Boolean,
      default: true,
    },
    screenshotFormat: {
      type: String,
      default: "image/jpeg",
    },
    selectFirstDevice: {
      type: Boolean,
      default: false,
    },
    deviceId: {
      type: String,
      default: null,
    },
    playsinline: {
      type: Boolean,
      default: true,
    },
    resolution: {
      type: Object,
      default: null,
      validator: (value) => {
        return value.height && value.width;
      },
    },
  },

  data() {
    return {
      source: null,
      canvas: null,
      camerasListEmitted: false,
      cameras: [],
      flip: true,
      ready: false,
    };
  },

  watch: {
    deviceId: function (id) {
      this.changeCamera(id);
    },
  },

  mounted() {
    this.setupMedia();
  },

  beforeDestroy() {
    this.cameraListEmitted = false;
    this.stop();
  },

  methods: {
    /**
     * get user media
     */
    legacyGetUserMediaSupport() {
      return (constraints) => {
        // First get ahold of the legacy getUserMedia, if present
        let getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia ||
          navigator.oGetUserMedia;

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          return Promise.reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    },

    /**
     * setup media
     */
    setupMedia() {
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }

      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = this.legacyGetUserMediaSupport();
      }

      this.testMediaAccess();
    },

    /**
     * load available cameras
     */
    loadCameras() {
      navigator.mediaDevices
        .enumerateDevices()
        .then((deviceInfos) => {
          for (let i = 0; i !== deviceInfos.length; ++i) {
            let deviceInfo = deviceInfos[i];
            if (deviceInfo.kind === "videoinput") {
              this.cameras.push(deviceInfo);
            }
          }
        })
        .then(() => {
          if (!this.camerasListEmitted) {
            if (this.selectFirstDevice && this.cameras.length > 0) {
              this.deviceId = this.cameras[0].deviceId;
            }

            this.$emit("cameras", this.cameras);
            this.camerasListEmitted = true;
          }
        })
        .catch((error) => this.$emit("notsupported", error));
    },

    /**
     * change to a different camera stream, like front and back camera on phones
     */
    changeCamera(deviceId) {
      this.stop();
      this.$emit("camera-change", deviceId);
      this.loadCamera(deviceId);
    },

    /**
     * load the stream to the
     */
    loadSrcStream(stream) {
      if ("srcObject" in this.$refs.video) {
        // new browsers api
        this.$refs.video.srcObject = stream;
      } else {
        // old broswers
        this.source = window.HTMLMediaElement.srcObject(stream);
      }
      // Emit video start/live event
      this.$refs.video.onloadedmetadata = () => {
        this.ready = true;
        this.$emit("video-live", stream);
      };

      this.$emit("started", stream);
    },

    /**
     * stop the selected streamed video to change camera
     */
    stopStreamedVideo(videoElem) {
      let stream = videoElem.srcObject;
      let tracks = stream.getTracks();
      this.ready = false;

      tracks.forEach((track) => {
        // stops the video track
        track.stop();
        this.$emit("stopped", stream);

        this.$refs.video.srcObject = null;
        this.source = null;
      });
    },

    // stop the video
    stop() {
      if (this.$refs.video !== null && this.$refs.video.srcObject) {
        this.stopStreamedVideo(this.$refs.video);
      }
    },

    // start the video
    start() {
      if (this.deviceId) {
        this.loadCamera(this.deviceId);
      }
    },

    // pause the video
    pause() {
      if (this.$refs.video !== null && this.$refs.video.srcObject) {
        this.$refs.video.pause();
      }
    },

    // resume the video
    resume() {
      if (this.$refs.video !== null && this.$refs.video.srcObject) {
        this.$refs.video.play();
      }
    },

    /**
     * test access
     */
    testMediaAccess() {
      let constraints = { video: true };

      if (this.resolution) {
        constraints.video = {};
        constraints.video.height = this.resolution.height;
        constraints.video.width = this.resolution.width;
      }

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          //Make sure to stop this MediaStream
          let tracks = stream.getTracks();
          tracks.forEach((track) => {
            track.stop();
          });
          this.loadCameras();
        })
        .catch((error) => this.$emit("error", error));
    },

    /**
     * load the camera passed as index!
     */
    loadCamera(device) {
      let constraints = { video: { deviceId: { exact: device } } };

      if (this.resolution) {
        constraints.video.height = this.resolution.height;
        constraints.video.width = this.resolution.width;
      }

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => this.loadSrcStream(stream))
        .catch((error) => this.$emit("error", error));
    },

    /**
     * capture screenshot
     */
    capture() {
      return this.getCanvas().toDataURL(this.screenshotFormat);
    },

    /**
     * get canvas
     */
    getCanvas() {
      let video = this.$refs.video;
      if (!this.ctx) {
        let canvas = document.createElement("canvas");
        canvas.height = 500;
        canvas.width = 500;
        this.canvas = canvas;

        this.ctx = canvas.getContext("2d");
      }
      const crop = (video.videoWidth - video.videoHeight) / 2;
      const { ctx, canvas } = this;
      let fac = 1;
      if (this.flip) {
        ctx.scale(-1, 1);
        fac = -1;
      }
      ctx.drawImage(
        video,
        crop,
        0,
        video.videoWidth - 2 * crop,
        video.videoHeight,
        0,
        0,
        fac * canvas.width,
        canvas.height
      );

      return canvas;
    },
  },
};
</script>

<style lang="postcss">
.flip {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
