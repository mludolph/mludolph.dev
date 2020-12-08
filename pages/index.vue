<template>
  <div>
    <section class="container max-w-content m-auto mb-4">
      <div class="main-body">
        <div class="flex flex-col sm:flex-row">
          <div class="w-24 h-24 self-center mb-4 mr-0 sm:mr-4 sm:mb-0">
            <img class="rounded-full" src="images/profile_square.jpg" />
          </div>

          <div class="flex flex-col self-center">
            <div class="text-xl text-gray-800 font-secondary">I am</div>
            <h1
              class="text-3xl text-gray-800 font-secondary whitespace-no-wrap leading-none"
            >
              Moritz Ludolph
            </h1>
            <h2 class="text-base text-gray-800 font-sans mb-1">
              M.Sc. student @ TU Berlin
            </h2>
            <social-links></social-links>
          </div>
        </div>
      </div>
      <hr class="mt-6 mx-4" />
    </section>

    <section class="container max-w-content m-auto mb-4">
      <h1 class="text-2xl text-gray-800 font-light mb-4">projects</h1>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 place-content-stretch"
        v-if="loading"
      >
        <repo-card
          v-for="(repo, i) in repoNames"
          v-bind:key="i"
          :repo="null"
          :loading="loading"
        ></repo-card>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 place-content-stretch"
        v-if="!loading"
      >
        <repo-card
          v-for="(repo, i) in repos"
          v-bind:key="i"
          :repo="repo"
          :loading="loading"
        ></repo-card>
      </div>
      <hr class="mt-6 mx-4" />
    </section>
    <section class="container max-w-content m-auto pb-8">
      <h1 class="text-2xl text-gray-800 font-light mb-4">blog posts</h1>
      <blog-entry
        class="mb-2"
        v-for="(post, i) in posts"
        v-bind:key="i"
        :post="post"
      ></blog-entry>
    </section>
  </div>
</template>

<script>
export default {
  name: "blog",
  data: () => ({
    loading: true,
    repoNames: ["mludolph/mulearn", "mludolph/mludolph.github.io"],
  }),
  computed: {
    repos() {
      return this.$store.state.repos;
    },
  },
  async asyncData({ params, $content }) {
    const posts = await $content("posts").fetch();
    return { posts };
  },
  mounted() {
    this.loading = true;
    this.$store
      .dispatch("load_repos", this.repoNames)
      .finally(() => (this.loading = false));
  },
  head() {
    return {
      title: "Moritz Ludolph's Blog",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "mludolph_index",
          name: "Moritz Ludolph's Blog",
          content: "All things about machine learning, data analysis and IoT.",
        },
      ],
    };
  },
};
</script>
<style lang="scss"></style>
