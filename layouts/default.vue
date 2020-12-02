<template>
  <div id="app">
    <!--<div class="header-gradient"></div>-->
    <header class="container header-container">
      <div class="is-flex is-justify-content-space-between">
        <div class="is-flex has-text-dark is-height-fit-content">
          <nuxt-link to="/" tag="span" class="is-clickable">
            <span class="is-size-5">mludol.</span
            ><span class="has-text-weight-semibold is-size-5">ph</span>
          </nuxt-link>
        </div>
        <div class="is-flex is-flex-direction-column has-text-right">
          <nuxt-link
            class="is-block"
            v-for="(item, i) in menu"
            v-bind:key="i"
            :to="item.to"
          >
            <span
              v-if="item.names.indexOf($route.name) != -1"
              class="title is-3 has-text-weight-bold has-text-dark active-route"
            >
              {{ item.title }}
            </span>
            <span v-else class="is-size-5 has-text-dark">
              {{ item.title }}
            </span>
          </nuxt-link>
        </div>
      </div>
    </header>
    <main>
      <nuxt />
    </main>
    <!--
    <footer class="footer">
      <div class="container footer-container">
        <div class="columns">
          <div class="column is-two-fifths">
            <h1 class="title is-size-5 has-text-light">
              About this page
            </h1>
            <p class="has-text-grey-light is-size-7 mb-4">
              Made with <font-awesome-icon icon="heart" /> using
              <a href="https://https://nuxtjs.org/">Nuxt.js</a> and hosted on
              <a href="https://github.com/mludolph/mludolph.github.io">GitHub</a
              >.
            </p>
            <p class="has-text-grey-light is-size-7">
              Copyright &copy; 2020 All rights reserved
            </p>
            <p></p>
          </div>
          <div class="column is-two-fifths"></div>
          <div class="column is-one-fifths">
            <h1 class="title is-size-5 has-text-light">
              Follow me!
            </h1>
            <p class="has-text-grey-light is-size-7 mb-4">
              Connect with all my social media links
            </p>
            <social-links theme="light"></social-links>
          </div>
        </div>
      </div>
    </footer>
    -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          title: "blog",
          names: ["index", "blog-slug"],
          to: "/",
        },
        {
          title: "resume",
          names: ["resume"],
          to: "/resume",
        },
      ],
    };
  },
  computed: {
    year() {},
  },
};
</script>

<style lang="scss"></style>
