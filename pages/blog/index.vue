<template>
  <section class="main-section">
    <div class="main-body">
      <h3 class="title">
        blog
      </h3>
      <div class="columns">
        <div class="column is-full">
          <div
            class="blog-entry-wrapper mb-2"
            v-for="(entry, i) in blogEntries"
            v-bind:key="i"
          >
            <div class="blog-entry">
              <div class="blog-entry-content">
                <nuxt-link
                  class="d-block title is-4"
                  :to="'/blog/' + entry.slug + '/'"
                  >{{ entry.title }}</nuxt-link
                >
                <p class="subtitle is-6 has-text-grey has-text-weight-light">
                  {{ entry.subtitle }}
                </p>
                <div class="blog-entry-footer">
                  <div
                    class="is-size-7 has-text-grey has-text-weight-normal mb-2"
                  >
                    <time :datetime="entry.timestamp">{{
                      entry.timestamp | formatDate
                    }}</time>
                    &middot; {{ entry.wordcount | readTime }} min read
                  </div>
                  <div class="tags are-normal">
                    <span
                      v-for="(tag, i2) in entry.tags"
                      v-bind:key="i2"
                      class="tag"
                      >{{ tag }}</span
                    >
                  </div>
                </div>
              </div>
              <a class="blog-entry-image">
                <img v-if="entry.image" :src="entry.image" :alt="entry.title" />
              </a>
            </div>
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
      return this.$store.state.blogEntries;
    },
  },
};
</script>
