import Vue from "vue";

export const state = () => ({
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
});

export const mutations = {
  setClasses(state, classes) {
    state.classes = classes;
  },
  createClass(state) {
    const id = state.classes.length + 1;
    state.classes.push({
      id: id,
      title: "Class " + id,
      samples: [],
    });
  },
  addClass(state, cls) {
    state.classes.push(cls);
  },
  addSample(state, { sample, clsId }) {
    const idx = state.classes.findIndex(({ id }) => id === clsId);
    if (idx != -1) {
      state.classes[idx].samples.push(sample);
    }
  },
  deleteSample(state, { sampleIdx, clsId }) {
    const idx = state.classes.findIndex(({ id }) => id === clsId);
    console.log("DELETE: " + sampleIdx);
    if (idx != -1) {
      Vue.delete(state.classes[idx].samples, sampleIdx);
    }
  },
  clearSamples(state, { clsId }) {
    const idx = state.classes.findIndex(({ id }) => id === clsId);
    if (idx != -1) {
      Vue.set(state.classes, idx, { ...state.classes[idx], samples: [] });
    }
  },
  updateClass(state, { update, clsId }) {
    const idx = state.classes.findIndex(({ id }) => id === clsId);
    if (idx != -1) {
      Vue.set(state.classes, idx, update);
    }
  },
  deleteClass(state, { clsId }) {
    const idx = state.classes.findIndex(({ id }) => id === clsId);
    if (idx != -1) {
      Vue.delete(state.classes, idx);
    }
  },
  updateTrainingState(state, { update }) {
    Object.entries(update).forEach(([key, value]) => {
      Vue.set(state.training, key, value);
    });
  },
  resetTrainingState(state) {
    state.training = {
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
};

export const actions = {
  saveToFile() {},

  async loadDummyData({ commit }) {
    commit("resetTrainingState");

    const CAT_URLS = [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/800px-Cat_November_2010-1a.jpg",
    ];
    const DOG_URLS = [
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
      "https://i.insider.com/5ef54cb61918242cfb4ec653",
    ];
    const fetchBase64 = (url) =>
      this.$axios
        .get(url, { responseType: "arraybuffer" })
        .then((response) => {
          let blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          return URL.createObjectURL(blob);
        })
        .then((url) => this.$imutils.cropImage(url));

    const classes = [
      {
        id: 1,
        title: "Cat",
        samples: await Promise.all(CAT_URLS.map(fetchBase64)),
      },
      {
        id: 2,
        title: "Dog",
        samples: await Promise.all(DOG_URLS.map(fetchBase64)),
      },
    ];

    commit("setClasses", classes);
  },
  loadFromFile() {},
};
