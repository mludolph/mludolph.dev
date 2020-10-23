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
});

export const mutations = {
  addBlogEntry(state, blogEntry) {
    if (blogEntry) {
      state.blogEntries = [...state.blogEntries, stateblogEntry];
    }
  },
};
