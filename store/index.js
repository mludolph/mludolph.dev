export const state = () => ({
  blogEntries: [
    {
      slug: "test",
      title: "3 things you should do on your portfolio website",
      subtitle: "What you should really focus on",
      timestamp: "2020-09-23T15:53:53+0000",
      document: "test",
      wordcount: 1042,
      tags: ["portfolio", "website"],
    },
    {
      slug: "test2",
      title: "5 things to do as a data scientist",
      subtitle: "Things you would have missed out on!",
      timestamp: "2020-09-23T15:54:53+0000",
      wordcount: 1042,
      image:
        "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=991&q=80",
      tags: ["portfolio", "website"],
    },
  ],
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
});

export const mutations = {
  addBlogEntry(state, blogEntry) {
    if (blogEntry) {
      state.blogEntries = [...state.blogEntries, stateblogEntry];
    }
  },
};
