<template>
  <section class="container max-w-content mx-auto">
    <div class="dots"></div>
    <div class="dots-vertical"></div>
    <div class="transition duration-300 ease-in-out">
      <nuxt-link to="/">
        <span class="text-gray-800 dark:text-gray-300">
          <font-awesome-icon :icon="['fas', 'arrow-left']"></font-awesome-icon>
        </span>
      </nuxt-link>

      <div class="flex flex-col w-full mt-2">
        <div class="flex flex-col mb-8">
          <div class="text-xs text-gray-600 dark:text-gray-400 ml-8">
            <time :datetime="post.createdAt">{{
              post.createdAt | formatDate
            }}</time>
            &middot; {{ post.readingTime }} min read
          </div>

          <div class="flex flex-col">
            <div class="flex items-center mb-2">
              <font-awesome-icon
                class="text-primary text-base w-6 mr-2"
                :icon="[post.faIconPack, post.faIcon]"
              ></font-awesome-icon>
              <span
                class="text-xl sm:text-2xl text-gray-800 dark:text-gray-300 font-sans font-semibold leading-none"
              >
                {{ post.title }}
              </span>
            </div>
            <div
              class="text-sm sm:text-base text-gray-700 dark:text-gray-400 font-blog leading-none ml-8 mb-3"
            >
              {{ post.subtitle }}
            </div>
          </div>
        </div>
        <nuxt-content
          :document="post"
          class="text-gray-800 dark:text-gray-300"
        />
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

  async asyncData({ params, $content }) {
    const post = await $content("posts", params.slug).fetch();
    return { post };
  },
  head() {
    return {
      title: this.post.title + "| Moritz Ludolph",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "mludolph_blog_" + this.post.slug,
          name: this.post.title + " | Moritz Ludolph",
          content: "",
        },
      ],
    };
  },
};
</script>
