<template>
  <section class="main-section">
    <div class="main-body">
      <p class="title">
        {{ entry.title }}
      </p>
      <p class="subtitle"></p>
      <div class="columns">
        <div class="column is-full">
          <nuxt-content :document="document" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Entry",
  data() {
    return {};
  },
  computed: {},
  async asyncData({ store, params, $content }) {
    const entry = store.state.blogEntries.filter(
      (entry) => entry.slug === params.slug
    )[0];

    const document = await $content(entry.source).fetch();
    return { entry: entry, document: document };
  },
};
</script>
