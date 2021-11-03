export const state = () => ({
  repos: [],
  repoNames: [
    "rusty1s/pytorch_cluster",
    "mludolph/pytorch_isin",
    "mludolph/mludolph.github.io",
  ],
  loading: true,
});

export const mutations = {
  setRepositories(state, payload) {
    state.repos = payload;
  },
  setLoading(state, value) {
    if (!value || state.repos.length == 0) {
      state.loading = value;
    }
  },
};

const GITHUB_API = "https://api.github.com/";

export const actions = {
  async LOAD({ commit, state }) {
    commit("setLoading", true);
    const promises = state.repoNames.map((name) =>
      this.$axios.get(GITHUB_API + "repos/" + name)
    );
    const responses = await Promise.all(promises);
    let repos = responses.map((r) => r.data);

    repos = repos.map(async (repo) => {
      repo.languages = await this.$axios.get(repo.languages_url);
      repo.languages = repo.languages.data;
      return repo;
    });
    repos = await Promise.all(repos);
    commit("setRepositories", repos);
    commit("setLoading", false);
  },
};

export const getters = {
  getRepositories: (state) => {
    return state.repos;
  },
  getRepositoryNames: (state) => {
    return state.repoNames;
  },
  isLoading: (state) => {
    return state.loading;
  },
};
