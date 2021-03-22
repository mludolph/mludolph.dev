<template>
  <div id="app" class="flex flex-col px-4 xl:mx-0 min-h-screen z-minus-5">
    <header class="container max-w-content mx-auto pt-4 mb-24 sm:mb-24">
      <div class="flex justify-between">
        <div class="flex flex-col h-content">
          <nuxt-link
            to="/"
            tag="span"
            class="cursor-pointer select-none tap-transparent"
          >
            <span class="text-2xl text-gray-800 dark:text-gray-300 font-blog"
              >mludolph.</span
            ><span
              class="text-2xl text-gray-800 dark:text-gray-300 font-blog font-semibold"
              >dev</span
            >
          </nuxt-link>
          <div
            class="text-xs text-gray-600 dark:text-gray-400 font-secondary mb-1 select-none"
          >
            portfolio
          </div>
        </div>

        <div class="flex flex-col items-end select-none">
          <nuxt-link
            class="block tap-transparent"
            v-for="(item, i) in menu"
            v-bind:key="i"
            :aria-label="item.title"
            :to="item.to"
          >
            <span
              v-if="item.names.indexOf($route.name) != -1"
              class="text-3xl text-gray-800 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 font-bold font-secondary"
            >
              {{ item.title }}
            </span>
            <span
              v-else
              class="text-lg text-gray-800 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 font-secondary"
            >
              {{ item.title }}
            </span>
          </nuxt-link>

          <a
            class="text-lg text-gray-800 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 font-secondary"
            :href="mail"
            >contact</a
          >
          <span
            class="flex mt-1 cursor-pointer text-gray-800 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400"
          >
            <font-awesome-icon
              class="w-4"
              @click="setColorMode('light')"
              v-if="darkMode"
              :icon="['fas', 'sun']"
            ></font-awesome-icon>
            <font-awesome-icon
              class="w-4"
              @click="setColorMode('dark')"
              v-if="!darkMode"
              :icon="['fas', 'moon']"
            ></font-awesome-icon>
          </span>
        </div>
      </div>
    </header>

    <Nuxt />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  loading: true,
  data() {
    return {
      mail: "mailto:mail@moritzludolph.de",
      menu: [
        {
          title: "home",
          names: ["index", "posts-slug"],
          to: "/",
        },
        {
          title: "about me",
          names: ["aboutme"],
          to: "/aboutme",
        },
      ],
    };
  },
  computed: {
    darkMode() {
      return this.$colorMode.value === "dark";
    },
  },
  mounted() {
    /*
    if (this.initialized) {
      let matched = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.$store.commit("setDarkMode", matched);
      this.$store.commit("setInitialized", true);
    }*/
  },
  methods: {
    setColorMode(value) {
      this.$colorMode.preference = value;
    },
  },
};
</script>