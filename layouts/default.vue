<template>
  <div id="app" class="container full-height">
    <header class="level">
      <span
        class="level-left tag is-dark is-medium is-family-monospace has-text-light"
        ><span class="is-size-5">m</span
        ><span class="has-text-weight-bold is-size-5">.io</span></span
      >
      <div class="level-right">
        <nuxt-link
          class="pl-2"
          v-for="(item, i) in menu"
          v-bind:key="i"
          :to="item.to"
        >
          <span class="has-text-dark is-family-monospace">
            {{ item.title }}</span
          >
        </nuxt-link>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          title: "home",
          route: "index",
          to: "/",
        },
        {
          title: "projects",
          route: "projects",
          to: "/projects",
        },
        {
          title: "contact",
          route: "contact",
          to: "/contact",
        },
      ],
    };
  },
};
</script>

<style lang="scss"></style>
