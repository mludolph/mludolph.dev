<template>
  <section class="main-section">
    <div class="main-body">
      <h3 class="title">
        Blog
      </h3>
      <div class="columns">
        <div class="column">
          <div class="card" v-for="(entry, i) in blog_entries" v-bind:key="i">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-64x64">
                    <img
                      src="https://bulma.io/images/placeholders/96x96.png"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ entry.title }}</p>
                  <p class="subtitle is-6 has-text-grey has-text-weight-light">
                    {{ entry.subtitle }}
                  </p>
                </div>
              </div>
              <div class="content">
                <span class="is-size-7 has-text-grey has-text-weight-normal"
                  ><time :datetime="entry.timestamp">{{
                    entry.timestamp | formatDate
                  }}</time>
                  &middot; {{ entry.wordcount | readTime }} min read</span
                >
              </div>
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
          tags: ["portfolio", "website"],
        },
      ],
    };
  },
};
</script>
