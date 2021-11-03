export const state = () => ({
  posts: [],
  postsCount: 0,
  loading: true,
});

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload;
  },
  setLoading(state, value) {
    if (!value || state.posts.length == 0) {
      state.loading = value;
    }
  },
};

export const actions = {
  async LOAD({ commit }, contentContext) {
    commit("setLoading", true);
    const posts = await contentContext("posts").without(["body"]).fetch();
    commit("setPosts", posts);
    commit("setLoading", false);
  },
};

export const getters = {
  getPosts: (state) => {
    return state.posts;
  },
  getPostsCount: (state) => {
    return state.postsCount;
  },
  isLoading: (state) => {
    return state.loading;
  },
};
