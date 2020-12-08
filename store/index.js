import { faTruckLoading } from "@fortawesome/free-solid-svg-icons";

export const state = () => ({
  timelineEntries: [
    {
      startDate: "2019-10",
      endDate: "today",
      title: "M.Sc. Computer Science",
      institution: "Technical Unversity of Berlin",
      descriptionLines: ["Data Science and Engineering Track"],
    },
    {
      startDate: "2018-04",
      endDate: "2018-09",
      title: "Teaching Assistant",
      institution: "Technical University Dortmund",
      descriptionLines: [
        "Taught exercise groups for “Data Structures, Algorithms and Programming 2”, corrected exercise sheets, and helped to prepare exams.",
      ],
    },
    {
      startDate: "2017-04",
      endDate: "2017-09",
      title: "Teaching Assistant",
      institution: "Technical University Dortmund",
      descriptionLines: [
        "Taught exercise groups for “Data Structures, Algorithms and Programming 2”, corrected exercise sheets, and helped to prepare exams.",
      ],
    },

    {
      startDate: "2016-03",
      endDate: "2016-04",
      title: "Freelancer",
      institution: "Laverana GmbH & Co. KG, Hannover",
      descriptionLines: [
        "Created a discrete simulation of several production lines for natural cosmetics using real world data in order to test different scenarios and assist in planning and optimization.",
      ],
    },
    {
      startDate: "2015-10",
      endDate: "2019-03",
      title: "B.Sc. Computer Science",
      institution: "Technical Unversity of Dortmund",
      descriptionLines: [
        "Minor Subject: Logistics",
        "Thesis: Object Segmentation in Point Clouds using Deep Neural Networks",
        "GPA: 1.2",
      ],
    },

    {
      startDate: "2007-09",
      endDate: "2015-06",
      title: "A-levels",
      institution: "Goethe-Gymnasium Dortmund",
      descriptionLines: [
        "Major Subjects: Maths, Computer Science, English, Social Sciences",
        "GPA: 1.1",
      ],
    },
  ],
  repos: [],
});

export const mutations = {
  save_repos(state, payload) {
    console.log(payload);
    state.repos = payload;
  },
};

const GITHUB_API = "https://api.github.com/";

export const actions = {
  async load_repos({ commit }, names) {
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
    commit("save_repos", repos);
  },
};
