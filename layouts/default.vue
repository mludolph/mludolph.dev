<template>
  <div id="app" class="mx-4 xl:mx-0">
    <!--<div class="header-gradient"></div>-->
    <header class="container max-w-content mx-auto pt-4 mb-32 sm:mb-48">
      <div class="flex justify-between">
        <div class="flex h-fit-content">
          <nuxt-link to="/" tag="span" class="cursor-pointer">
            <span class="text-2xl text-gray-800 font-blog">mludol.</span
            ><span class="text-2xl text-gray-800 font-blog font-semibold"
              >ph</span
            >
          </nuxt-link>
        </div>
        <div class="flex flex-col text-right">
          <nuxt-link
            class="block"
            v-for="(item, i) in menu"
            v-bind:key="i"
            :to="item.to"
          >
            <span
              v-if="item.names.indexOf($route.name) != -1"
              class="text-3xl text-gray-800 font-bold font-secondary"
            >
              {{ item.title }}
            </span>
            <span v-else class="text-lg text-gray-800 font-secondary">
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
