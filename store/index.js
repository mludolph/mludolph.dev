import { faTruckLoading } from "@fortawesome/free-solid-svg-icons";

export const state = () => ({
  darkMode: true,
  timelineEntries: [
    {
      periods: [["2019-10", "today"]],
      title: "M.Sc. Computer Science",
      institution: "Technical Unversity of Berlin",
      descriptionLines: [
        "Data Science and Engineering Track",
        "Coursework: Machine Learning, Database Technology, Cloud Computing",
      ],
    },
    {
      periods: [["2018-02", "2018-04"]],
      title: "Intern IoT Data Analytics",
      institution: "T-Systems International GmbH, Bonn",
      descriptionLines: [
        "Integrated public datasets for the use in a data analytics platform and different PoCs, built data processing and cleaning pipelines using Apache Spark on Microsoft Azure",
      ],
    },

    {
      periods: [
        ["2017-04", "2017-09"],
        ["2018-04", "2018-09"],
      ],
      title: "Teaching Assistant",
      institution: "Technical University Dortmund",
      descriptionLines: [
        "Taught exercise groups for “Data Structures, Algorithms and Programming 2”, corrected and graded assignments, helped to prepare exams",
      ],
    },

    {
      periods: [["2016-03", "2016-04"]],
      title: "Freelancer",
      institution: "Laverana GmbH & Co. KG, Hannover",
      descriptionLines: [
        "Developed and implemented a discrete simulation of production lines for natural cosmetics, trained employees to simulate and test different scenarios using real world data in order to assist in planning and optimization",
      ],
    },
    {
      periods: [["2015-10", "2019-03"]],
      title: "B.Sc. Computer Science",
      institution: "Technical Unversity of Dortmund",
      descriptionLines: [
        "Minor Subject: Logistics",
        "Thesis: Object Segmentation in Point Clouds using Deep Neural Networks",
        "GPA: 1.2 with distinction",
      ],
    },

    {
      periods: [["2007-09", "2015-06"]],
      title: "A-levels",
      institution: "Goethe-Gymnasium Dortmund",
      descriptionLines: [
        "Major Subjects: Maths, Computer Science, English, Social Sciences",
        "GPA: 1.1",
      ],
    },
  ],
  repos: [],
  loading: true,
});

export const mutations = {
  saveRepositories(state, payload) {
    console.log(payload);
    state.repos = payload;
  },
  setDarkMode(state, value) {
    state.darkMode = value;
  },
  setLoading(state, value) {
    if (!value || state.repos.length == 0) {
      state.loading = value;
    }
  },
};

const GITHUB_API = "https://api.github.com/";

export const actions = {
  async loadRepositories({ commit }, names) {
    commit("setLoading", true);
    const promises = names.map((name) =>
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
    commit("saveRepositories", repos);
    commit("setLoading", false);
  },
};

export const getters = {
  getDarkMode: (state) => {
    return state.darkMode;
  },
  getRepositories: (state) => {
    return state.repos;
  },
  isLoading: (state) => {
    return state.loading;
  },
};
