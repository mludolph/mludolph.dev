<template>
  <section class="container main-container">
    <div class="main-body">
      <div
        class="is-flex is-align-items-center is-justify-content-space-between mb-6"
      >
        <h1 class="title is-size-3 mb-0">resume</h1>
        <a href="/resume_moritzludolph.pdf" download="" class=""
          ><b-icon
            pack="fas"
            icon="download"
            class="has-text-dark is-hover-light"
          ></b-icon
        ></a>

        <!-- class="button is-primary is-outlined resume-button is-height-fit-content is-align-self-center ml-3"--->
      </div>

      <div class="timeline is-centered">
        <header class="timeline-header">
          <span class="tag is-primary">today</span>
        </header>
        <div
          v-for="(entry, i) in timelineEntries"
          v-bind:key="i"
          class="timeline-item"
        >
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <p class="heading">
              {{ entry.startDate | formatDate2 }} -
              {{ entry.endDate | formatDate2 }}
            </p>
            <h2 class="title is-size-6">{{ entry.title }}</h2>
            <h3 class="subtitle is-size-7">{{ entry.institution }}</h3>
            <p
              class="is-size-7"
              v-for="(line, i2) in entry.descriptionLines"
              v-bind:key="i2"
            >
              {{ line }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "resume",
  computed: {
    timelineEntries() {
      return this.$store.state.timelineEntries;
    },
  },
};
</script>

<style lang="scss">
.timeline-content {
  max-width: 400px;
}
</style>
