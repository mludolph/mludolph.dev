<template>
  <div id="app" class="flex flex-col min-h-screen px-4 xl:mx-0 z-minus-5">
    <header class="container max-w-content mx-auto pt-4">
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
              class="
                text-2xl text-gray-800
                dark:text-gray-300
                font-blog font-semibold
              "
              >dev</span
            >
          </nuxt-link>
          <div
            class="text-xs text-gray-600 dark:text-gray-400 mb-1 select-none"
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
              class="
                text-3xl text-gray-800
                dark:text-gray-300
                hover:text-gray-700
                dark:hover:text-gray-400
                font-bold
              "
            >
              {{ item.title }}
            </span>
            <span
              v-else
              class="
                text-lg text-gray-800
                dark:text-gray-300
                hover:text-gray-700
                dark:hover:text-gray-400
              "
            >
              {{ item.title }}
            </span>
          </nuxt-link>

          <a
            class="
              text-lg text-gray-800
              dark:text-gray-300
              hover:text-gray-700
              dark:hover:text-gray-400
              font-secondary
              hero
            "
            :href="mail"
            >get in touch</a
          >
          <span
            class="
              flex
              mt-1
              cursor-pointer
              text-gray-800
              dark:text-gray-300
              hover:text-gray-700
              dark:hover:text-gray-400
            "
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

    <footer class="mt-auto">
      <cookie-law
        theme="custom"
        class="container max-w-content m-auto"
        v-on:accept="enableTracking()"
      ></cookie-law>

      <div
        class="
          footer
          container
          max-w-content
          m-auto
          justify-center
          text-xs
          font-light
          mb-1
        "
      >
        <span class="text-gray-800 dark:text-gray-300"
          >Made with ❤ in Berlin
        </span>
        <span class="text-gray-800 dark:text-gray-300 mx-1"> | </span>
        <nuxt-link
          class="text-primary hover:text-indigo-500 active:text-indigo-500"
          to="/"
          >Privacy</nuxt-link
        >
      </div>
    </footer>
  </div>
</template>

<script>
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
  mounted() {},
  methods: {
    setColorMode(value) {
      this.$colorMode.preference = value;
    },
    enableTracking() {
      this.$gtag.optIn();
    },
  },
};
</script>

<style lang="postcss">
.Cookie--custom {
  @apply py-2 px-4;
  @apply dark:bg-gray-700 bg-gray-50;
  @apply rounded-t;

  .Cookie__content {
    @apply text-sm;
  }
  .Cookie__button {
    @apply text-sm rounded;
    @apply bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500 text-gray-50 focus:outline-none px-2 py-1;
  }
}
.footer {
  @apply flex flex-row w-full;
  @apply overflow-hidden box-border z-40 items-baseline;
}
.hero {
  @apply transition-all duration-500;
  background: rgb(34, 193, 195);
  background: linear-gradient(
    27deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  background-position: left center;
}
.hero:hover {
  background-position: right center;
}
</style>
