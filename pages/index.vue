<template>
  <div class="mt-4">
    <section class="container max-w-content m-auto mb-4">
      <div class="dots"></div>
      <div class="dots-vertical"></div>
      <div class="transition duration-300 ease-in-out">
        <div
          class="
            flex flex-col
            items-center
            md:items-start
            text-center
            md:text-left md:flex-row md:justify-between
          "
        >
          <v-card></v-card>
          <div class="flex flex-col gap-2 mt-4 md:mt-0 px-6">
            <span
              class="
                text-md text-gray-800
                dark:text-gray-300
                uppercase
                w-full
                text-center
                md:text-left
              "
              >Things I Use</span
            >
            <div class="grid grid-cols-5 gap-4">
              <div class="w-10 h-10" v-for="icon in icons" :key="icon.name">
                <img
                  class="w-full h-full hover-icon"
                  :class="{ 'filter-white': $colorMode.value === 'dark' }"
                  :src="`icons/${icon.icon}`"
                  v-tooltip="{
                    content: icon.name,
                    placement: 'bottom',
                    delay: {
                      show: 100,
                      hide: 0,
                    },
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="mt-6 mx-4 dark:bg-gray-600" />
    </section>

    <section class="container max-w-content m-auto mb-4">
      <div class="">
        <h1
          class="
            text-md text-gray-800
            dark:text-gray-300
            uppercase
            w-full
            text-center
            sm:text-left
            mb-4
          "
        >
          Contributions & Projects
        </h1>

        <div
          class="
            grid grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-2
            place-content-stretch
          "
          v-if="reposLoading"
        >
          <repo-card
            v-for="(repo, i) in repoNames"
            v-bind:key="i"
            :repo="null"
            :loading="true"
          ></repo-card>
        </div>
        <div
          class="
            grid grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-2
            place-content-stretch
          "
          v-if="!reposLoading"
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
    <section class="container max-w-content m-auto pb-8" v-if="postsCount > 0">
      <h1
        class="
          text-md text-gray-800
          dark:text-gray-300
          uppercase
          w-full
          text-center
          sm:text-left
          mb-4
        "
      >
        Blog Posts
      </h1>
      <div v-if="postsLoading">
        <post-list-entry
          class="mb-2"
          v-for="i in postsCount"
          v-bind:key="i"
          :post="null"
          :loading="true"
        ></post-list-entry>
      </div>
      <div v-else>
        <post-list-entry
          class="mb-2"
          v-for="(post, i) in posts"
          v-bind:key="i"
          :post="post"
          :loading="false"
        ></post-list-entry>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "blog",
  data: () => ({
    icons: [
      {
        icon: "python-icon.svg",
        name: "Python",
      },
      {
        icon: "javascript-icon.svg",
        name: "JavaScript",
      },
      {
        icon: "sql-database-generic.svg",
        name: "SQL",
      },

      {
        icon: "pytorch-icon.svg",
        name: "PyTorch",
      },
      {
        icon: "tensorflow-icon.svg",
        name: "Tensorflow",
      },
      {
        icon: "django-icon.svg",
        name: "Django",
      },
      {
        icon: "flask-icon.svg",
        name: "Flask",
      },
      {
        icon: "apache-kafka-icon.svg",
        name: "Apache Kafka",
      },
      {
        icon: "apache-spark-icon.svg",
        name: "Apache Spark",
      },
      {
        icon: "flink-icon.svg",
        name: "Apache Flink",
      },
      {
        icon: "docker-icon.svg",
        name: "Docker",
      },
      {
        icon: "kubernetes-icon.svg",
        name: "Kubernetes",
      },
      {
        icon: "microsoft-azure-icon.svg",
        name: "Microsoft Azure",
      },
    ],
  }),
  computed: {
    ...mapGetters({
      repos: "repos/getRepositories",
      repoNames: "repos/getRepositoryNames",
      reposLoading: "repos/isLoading",
      posts: "posts/getPosts",
      postsCount: "posts/getPostsCount",
      postsLoading: "posts/isLoading",
    }),
    meta() {},
  },
  async asyncData({ $content, store }) {
    await store.dispatch("repos/LOAD");
    await store.dispatch("posts/LOAD", $content);
  },
  head() {
    return {
      title: "Moritz Ludolph | ML & SWE",
      meta: [],
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

<style lang="postcss">
.filter-white {
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7384%)
    hue-rotate(295deg) brightness(130%) contrast(60%);
}
.hover-icon {
  @apply transition duration-300 ease-in-out;
}
.hover-icon:hover {
  @apply transform scale-110;
}

.v-popper--theme-tooltip .v-popper__inner {
  @apply text-gray-800 dark:text-gray-300 !important;
  @apply text-sm !important;
  @apply rounded-md shadow-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border !important;
  @apply px-2 py-1 !important;
  @apply opacity-100;
}
.v-popper--theme-tooltip .v-popper__arrow {
  @apply border-transparent;
}
</style>