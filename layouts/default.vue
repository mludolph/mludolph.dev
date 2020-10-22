<template>
  <div id="app" class="container main-container">
    <header class="is-pulled-left is-mobile header-bar">
      <span class="tag is-dark is-medium is-family-monospace has-text-light"
        ><span class="has-text-weight-bold  is-size-5">m</span
        ><span class="is-size-5">il</span></span
      >
      <div class="is-pulled-right">
        <nuxt-link
          class="d-block t-align-right"
          v-for="(item, i) in menu"
          v-bind:key="i"
          tag="a"
          :to="item.to"
        >
          <span
            v-if="item.route === $route.name"
            class="title has-text-dark is-family-sans-serif"
          >
            {{ item.title }}
          </span>
          <span v-else class="is-size-5 has-text-dark is-family-sans-serif">
            {{ item.title }}
          </span>
        </nuxt-link>
      </div>
    </header>
    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          title: "about me",
          route: "index",
          to: "/",
        },
        {
          title: "blog",
          route: "blog",
          to: "/blog",
        },
        {
          title: "ai",
          route: "ai",
          to: "/ai",
        },
        {
          title: "music",
          route: "music",
          to: "/music",
        },
        {
          title: "photography",
          route: "photography",
          to: "/photography",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.nav-item + .nav-item::before {
  //content: "·";
}
</style>
