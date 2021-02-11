<template>
  <div class="border border-gray-300 dark:border-gray-700 rounded p-4">
    <div class="flex flex-col justify-between h-full" v-if="loading">
      <div class="flex flex-col">
        <div
          class="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mt-1 mb-4"
        ></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-1"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-1"></div>
      </div>
      <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-1"></div>
    </div>
    <div class="flex flex-col justify-between h-full" v-if="!loading">
      <div class="flex flex-col">
        <a
          class="flex text-primary font-semibold leading-none w-content mb-4"
          :href="repo.html_url"
          >{{ repo.name }}</a
        >
        <p class="block text-gray-800 dark:text-gray-400 text-sm mb-2">
          {{ repo.description | truncate(100) }}
        </p>
      </div>
      <div class="flex flex-row relative justify-between select-none">
        <div
          class="text-gray-600 dark:text-gray-500 text-sm"
          @mouseenter="dropdown(true)"
          @mouseleave="dropdown(false)"
        >
          <font-awesome-icon :icon="icon(repo.language)"></font-awesome-icon>
          {{ repo.language }}
          <span v-if="this.languagesCount > 1">
            (+{{ this.languagesCount - 1 }}
            <span class="text-primary">more</span>)</span
          >
        </div>
        <div class="text-gray-600 dark:text-gray-500 text-sm">
          <font-awesome-icon :icon="['far', 'star']"></font-awesome-icon>
          <span>{{ repo.stargazers_count }}</span>
        </div>
        <div class="text-gray-600 dark:text-gray-500 text-sm">
          <font-awesome-icon
            class="mr-1"
            :icon="['fas', 'code-branch']"
          ></font-awesome-icon
          ><span>{{ repo.forks }}</span>
        </div>
        <transition
          enter-active-class="transition duration-300 ease-out transform"
          enter-class="-translate-y-3 scale-95 opacity-0"
          enter-to-class="translate-y-0 scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-class="translate-y-0 opacity-100"
          leave-to-class="-translate-y-3 opacity-0"
        >
          <div
            v-show="isVisible"
            class="absolute left-0 mt-6 w-40 rounded-md shadow-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border"
          >
            <!--
            <div
              class="absolute top-0 w-2 h-2 origin-center flyout-arrow bg-white border-t border-l border-gray-300 rounded-xs pointer-events-none"
            ></div>-->
            <div
              class="px-2 pt-2 pb-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div
                class="text-gray-600 dark:text-gray-500 text-sm mb-1"
                v-for="(i, language) in repo.languages"
                v-bind:key="i"
              >
                <div class="flex justify-between">
                  <div>
                    <font-awesome-icon
                      v-if="icon(language)"
                      class="mr-1 w-4"
                      :icon="icon(language)"
                    >
                    </font-awesome-icon
                    ><span>{{ language }}</span>
                  </div>

                  <span>{{ (percent(language) * 100) | round(1) }}%</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "repo-card",
  props: {
    repo: {
      type: Object,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      iconMap: {
        Python: ["fab", "python"],
        JavaScript: ["fab", "js-square"],
        Java: ["fab", "java"],
        Vue: ["fab", "vuejs"],
        Angular: ["fab", "angular"],
        React: ["fab", "react"],
        Sass: ["fab", "sass"],
      },
      isVisible: false,
      isLoaded: false,
    };
  },
  computed: {
    totalLines() {
      if (this.repo) {
        return Object.values(this.repo.languages).reduce((a, b) => a + b, 0);
      }
      return 0;
    },
    languagesCount() {
      if (this.repo) {
        return Object.keys(this.repo.languages).length;
      }
      return 0;
    },
  },
  methods: {
    percent(language) {
      return this.repo.languages[language] / this.totalLines;
    },
    icon(language) {
      return this.iconMap[language];
    },
    dropdown(visible) {
      if (this.languagesCount > 1) {
        this.isVisible = visible;
      }
    },
  },
};
</script>

<style>
.flyout-arrow {
  @apply transform;
  --transform-rotate: 45deg !important;
  --transform-translate-x: 0.75rem !important;
  --transform-translate-y: -0.33rem !important;
}
</style>