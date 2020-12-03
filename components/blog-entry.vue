<template>
  <div class="flex items-center">
    <div class="flex flex-col">
      <div class="text-xs text-gray-600 ml-8">
        <time :datetime="post.createdAt">{{
          post.createdAt | formatDate
        }}</time>
        &middot; {{ post.readingTime }} min read
      </div>

      <div class="flex">
        <nuxt-link class="cursor-pointer" :to="'/blog/' + post.slug">
          <div class="flex items-center mb-2">
            <font-awesome-icon
              class="text-primary text-base w-6 mr-2"
              :icon="[post.faIconPack, post.faIcon]"
            ></font-awesome-icon>
            <span
              class="text-lg sm:text-xl text-gray-800 font-semibold font-sans leading-none"
            >
              {{ post.title }}
            </span>
          </div>
          <div
            class="text-sm sm:text-sm text-gray-700 font-blog leading-none ml-8 mb-3"
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
