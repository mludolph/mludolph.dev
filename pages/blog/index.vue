<template>
  <section class="container main-container">
    <div class="main-body">
      <h1 class="title is-size-3">
        blog
      </h1>
      <div class="columns">
        <div class="column is-full">
          <div
            class="post-preview mb-2"
            v-for="(post, i) in posts"
            v-bind:key="i"
          >
            <div
              class="is-flex is-align-items-center is-justify-content-space-between"
            >
              <div class="mr-2 is-flex-grow-1">
                <nuxt-link
                  class="title is-clickable is-size-4 is-size-5-phone is-family-serif"
                  :to="'/blog/' + post.slug + '/'"
                  tag="h1"
                  >{{ post.title }}</nuxt-link
                >
                <h2
                  class="subtitle is-size-6 is-size-7-phone has-text-grey-dark is-family-serif mb-3"
                >
                  {{ post.subtitle }}
                </h2>
                <div
                  class="is-flex is-align-items-baseline is-justify-content-space-between"
                >
                  <div
                    class="is-size-7 has-text-grey has-text-weight-normal mb-2"
                  >
                    <time :datetime="post.createdAt">{{
                      post.createdAt | formatDate
                    }}</time>
                    &middot; {{ post.wordcount | readTime }} min read
                  </div>
                  <!-- <div class="tags are-normal mb-0">
                    <span
                      v-for="(tag, i2) in post.tags"
                      v-bind:key="i2"
                      class="tag mb-0"
                      >{{ tag }}</span
                    >
                  </div> -->
                  <div class="">
                    <button
                      class="button px-3 mr-2 has-border-none has-shadow-none"
                    >
                      <b-icon pack="fab" icon="medium"></b-icon>
                    </button>
                    <button
                      class="button px-3 mr-2 has-border-none has-shadow-none"
                    >
                      <b-icon pack="fas" icon="ellipsis-h"></b-icon>
                    </button>
                  </div>
                </div>
              </div>

              <img
                class="post-preview-image"
                v-if="post.image"
                :src="post.image"
                :alt="post.title"
              />
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Blog",
  data() {
    return {};
  },
  computed: {
    blogEntries() {
      return []; //this.$content;
    },
  },
  async asyncData({ params, $content }) {
    const posts = await $content("posts").fetch();
    return { posts };
  },
};
</script>
