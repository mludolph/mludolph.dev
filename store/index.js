export const state = () => ({
  darkMode: true,
  initialized: false,
});

export const mutations = {
  setDarkMode(state, value) {
    state.darkMode = value;
  },
  setInitialized(state, value) {
    state.intialized = value;
  },
};

export const actions = {};

export const getters = {
  getDarkMode: (state) => {
    return state.darkMode;
  },
  isInitialized: (state) => {
    return state.initialized;
  },
};
