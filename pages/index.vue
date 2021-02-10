<template>
  <div>
    <section class="container max-w-content m-auto mb-4">
      <div class="dots"></div>
      <div class="dots-vertical"></div>
      <div class="transition duration-300 ease-in-out">
        <div
          class="flex flex-col items-center sm:items-start text-center sm:text-left sm:flex-row sm:justify-between"
        >
          <vcard></vcard>
        </div>
      </div>
      <hr class="mt-6 mx-4 dark:bg-gray-600" />
    </section>

    <section class="container max-w-content m-auto mb-4">
      <div class="">
        <h1
          class="text-2xl text-gray-800 dark:text-gray-300 font-light w-full text-center sm:text-left mb-4"
        >
          projects
        </h1>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 place-content-stretch"
          v-if="loading"
        >
          <repo-card
            v-for="(repo, i) in repoNames"
            v-bind:key="i"
            :repo="null"
            :loading="true"
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
            :loading="false"
          ></repo-card>
        </div>
        <hr class="mt-6 mx-4 dark:bg-gray-600" />
      </div>
    </section>
    <section class="container max-w-content m-auto pb-8">
      <h1
        class="text-2xl text-gray-800 dark:text-gray-300 font-light w-full text-center sm:text-left mb-4"
      >
        blog posts
      </h1>
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
import { mapGetters } from "vuex";
import getSiteMeta from "@/utils/getSiteMeta";

export default {
  name: "blog",
  data: () => ({
    repoNames: ["mludolph/mludolph.github.io"],
  }),
  computed: {
    ...mapGetters({ repos: "getRepositories", loading: "isLoading" }),
    meta() {},
  },
  async asyncData({ params, $content, store }) {
    store.dispatch("loadRepositories", [
      "mludolph/mludolph.github.io",
      "mludolph/pytorch_isin",
    ]);
    const posts = await $content("posts").fetch();
    return { posts };
  },
  head() {
    return {
      title: "Moritz Ludolph | MSc CS student",
      meta: [...this.meta],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: "https://www.mludolph.dev",
        },
      ],
    };
  },
};
</script>
<style lang="scss"></style>
