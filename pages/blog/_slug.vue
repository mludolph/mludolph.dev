<template>
  <section class="container main-container">
    <div class="main-body">
      <nuxt-link to="/">
        <b-icon
          pack="fas"
          icon="arrow-left"
          class="has-text-dark is-hover-light"
        ></b-icon>
      </nuxt-link>

      <div class="columns">
        <div class="column is-full blog-post">
          <div class="is-flex is-align-items-center">
            <div class="is-flex is-flex-direction-column">
              <div
                class="is-size-7 has-text-grey has-text-weight-normal"
                style="margin-left: 2rem"
              >
                <time :datetime="post.createdAt">{{
                  post.createdAt | formatDate
                }}</time>
                &middot; {{ post.wordcount | readTime }} min read
              </div>

              <div class="is-flex">
                <b-icon
                  v-if="post.fabIcon"
                  :pack="post.fabIconPack"
                  :icon="post.fabIcon"
                  class="has-text-primary mr-2"
                  style="margin-top: 2px"
                ></b-icon>

                <div>
                  <div
                    class="title is-size-4 is-size-5-phone is-family-sans-serif"
                  >
                    {{ post.title }}
                  </div>
                  <div
                    class="subtitle is-size-6 is-size-6-phone has-text-grey-dark is-family-sans-serif mb-3"
                  >
                    {{ post.subtitle }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <nuxt-content :document="post" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "blog-post",
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
