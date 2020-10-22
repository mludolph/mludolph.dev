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
            v-for="(entry, i) in blog_entries"
            v-bind:key="i"
          >
            <div class="blog-entry">
              <div class="blog-entry-content">
                <p class="title is-4">{{ entry.title }}</p>
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
    return {
      blog_entries: [
        {
          title: "3 things you should do on your portfolio website",
          subtitle: "What you should really focus on",
          timestamp: "2020-09-23T15:53:53+0000",
          wordcount: 1042,
          tags: ["portfolio", "website"],
        },
        {
          title: "5 things to do as a data scientist",
          subtitle: "Things you would have missed out on!",
          timestamp: "2020-09-23T15:54:53+0000",
          wordcount: 1042,
          image:
            "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=991&q=80",
          tags: ["portfolio", "website"],
        },
      ],
    };
  },
};
</script>
