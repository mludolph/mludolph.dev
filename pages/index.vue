<template>
  <div>
    <section class="container max-w-content m-auto mb-16">
      <div class="main-body">
        <div class="flex flex-col sm:flex-row">
          <div class="w-24 h-24 self-center mb-4 mr-0 sm:mr-4 sm:mb-0">
            <img class="rounded-full" src="images/profile_square.jpg" />
          </div>

          <div class="flex flex-col self-center">
            <div class="text-xl text-gray-800 font-secondary">I am</div>
            <h1 class="text-3xl text-gray-800 font-secondary whitespace-no-wrap leading-none">
              Moritz Ludolph
            </h1>
            <h2 class="text-base text-gray-800 font-sans mb-1">
              M.Sc. student @ TU Berlin
            </h2>
            <social-links></social-links>
          </div>
        </div>
      </div>
    </section>
    <section class="container max-w-content m-auto">
      <div class="mb-2" v-for="(post, i) in posts" v-bind:key="i">
        <blog-entry :post="post"></blog-entry>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "blog",
  data() {
    return {};
  },
  async asyncData({ params, $content }) {
    const posts = await $content("posts").fetch();
    return { posts };
  },
  head() {
    return {
      title: "Moritz Ludolph's Blog",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "mludolph_index",
          name: "Moritz Ludolph's Blog",
          content: "All things about machine learning, data analysis and IoT.",
        },
      ],
    };
  },
};
</script>
<style lang="scss"></style>
