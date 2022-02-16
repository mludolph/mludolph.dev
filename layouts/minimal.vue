<template>
  <div id="app" class="flex flex-col min-h-screen px-4 xl:mx-0 z-minus-5">
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
          >Made with ❤ in Berlin | <NuxtLink to="/">mludolph.dev</NuxtLink>
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  loading: true,
  data() {
    return {};
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
