<template>
  <section class="main-section">
    <div class="main-body">
      <h3 class="title">
        ai
      </h3>
      <div class="columns is-multiline">
        <div
          class="column is-one-third"
          v-for="(entry, i) of entries"
          v-bind:key="i"
        >
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img v-if="entry.img" :src="entry.img" :alt="entry.title" />
              </figure>
            </div>
            <div class="card-content">
              <p class="title is-4">{{ entry.title }}</p>
              <p class="subtitle is-6 has-text-grey has-text-weight-light">
                {{ entry.subtitle }}
              </p>

              <div class="content">
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
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ai",
  data() {
    return {
      entries: [
        {
          title: "Title",
          subtitle: "Subtitle",
          tags: ["Machine Learning", "Statistics"],
          img:
            "https://sebastianraschka.com/images/blog/2014/kernel_pca/2014-09-14-kernel_pca_72_0.png",
        },
        {
          title: "Title",
          subtitle: "Subtitle",
          tags: ["Machine Learning", "Statistics"],
        },
        {
          title: "Title",
          subtitle: "Subtitle",
          tags: ["Machine Learning", "Statistics"],
        },
        {
          title: "Title",
          subtitle: "Subtitle",
          tags: ["Machine Learning", "Statistics"],
        },
        {
          title: "Title",
          subtitle: "Subtitle",
          tags: ["Machine Learning", "Statistics"],
        },
      ],
    };
  },
};
</script>
