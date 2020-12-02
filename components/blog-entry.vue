<template>
    <div class="is-flex is-align-items-center">
      <div class="is-flex is-flex-direction-column">
        <div
          class="is-size-7 has-text-grey has-text-weight-normal"
          style="margin-left: 2rem;"
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
          ></b-icon>

          <nuxt-link class="is-clickable" :to="'/blog/' + post.slug + '/'">
            <div class="title is-size-5 is-size-5-phone is-family-sans-serif">
              {{ post.title }}
            </div>
            <div
              class="subtitle is-size-6 is-size-7-phone has-text-grey-dark is-family-sans-serif mb-3"
            >
              {{ post.subtitle }}
            </div></nuxt-link
          >
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "blog-entry",
  props: {
    post: {
      type: Object,
    },
  },
};
</script>

<style></style>
