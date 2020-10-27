<template>
  <section class="container main-container">
    <div class="main-body">
      <div class="columns">
        <div class="column is-full blog-post">
          <h1
            class="title is-family-serif has-text-weight-bold is-size-3 is-size-4-mobile"
          >
            {{ post.title }}
          </h1>
          <h2
            class="subtitle is-family-serif has-text-grey-dark is-size-4 is-size-5-mobile"
          >
            {{ post.subtitle }}
          </h2>
          <div class="columns">
            <div class="column is-full">
              <nuxt-content :document="post" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Entry",
  data() {
    return {};
  },
  computed: {},
  async asyncData({ params, $content }) {
    const post = await $content("posts", params.slug).fetch();
    return { post };
  },
};
</script>
