<template>
  <div class="flex items-center">
    <div class="flex flex-col" v-if="loading">
      <div
        class="flex flex-row text-xs text-gray-600 dark:text-gray-500 ml-8 items-center mb-1"
      >
        <div
          class="flex h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded mr-1"
        ></div>
        &middot;
        <div
          class="inline h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded ml-1"
        ></div>
      </div>

      <div class="flex flex-col">
        <div class="flex items-center mb-2">
          <div class="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded mr-2"></div>
          <div class="h-6 w-80 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        <div class="h-4 w-60 bg-gray-300 dark:bg-gray-700 rounded ml-8"></div>
      </div>
    </div>
    <div class="flex flex-col" v-if="!loading">
      <div class="text-xs text-gray-600 dark:text-gray-500 ml-8">
        <time :datetime="post.createdAt">{{
          post.createdAt | formatDate
        }}</time>
        &middot; {{ post.readingTime }} min read
      </div>

      <nuxt-link
        class="flex flex-col cursor-pointer"
        :aria-label="post.title"
        :to="'/blog/' + post.slug"
      >
        <div class="flex items-center mb-2">
          <font-awesome-icon
            class="text-primary text-base w-6 mr-2"
            :icon="[post.faIconPack, post.faIcon]"
          ></font-awesome-icon>
          <span
            class="text-lg sm:text-xl text-gray-800 dark:text-gray-300 font-semibold font-sans leading-none"
          >
            {{ post.title }}
          </span>
        </div>
        <div
          class="text-sm sm:text-sm text-gray-700 dark:text-gray-400 font-blog leading-none ml-8 mb-3"
        >
          {{ post.subtitle }}
        </div></nuxt-link
      >
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
    loading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style></style>
