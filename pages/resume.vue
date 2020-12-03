<template>
  <section class="container max-w-5xl mx-auto">
    <div class="main-body">
      <div class="flex items-center justify-between mb-6 w-full">
        <h1 class="text-2xl text-gray-800 font-semibold mb-0">resume</h1>
        <a href="/resume_moritzludolph.pdf" download="">
          <font-awesome-icon
            class="text-gray-800 hover:text-gray-500"
            :icon="['fas', 'download']"
          ></font-awesome-icon>
        </a>
      </div>

      <div class="timeline is-centered">
        <header class="timeline-header">
          <span class="text-xs uppercase font-semibold bg-primary py-1 px-2 rounded text-white ">today</span>
        </header>
        <div
          v-for="(entry, i) in timelineEntries"
          v-bind:key="i"
          class="timeline-item"
        >
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <p class="text-gray-700 text-xs font-semibold uppercase">
              {{ entry.startDate | formatDate2 }} -
              {{ entry.endDate | formatDate2 }}
            </p>
            <h2 class="text-gray-800 text-lg font-bold leading-1">{{ entry.title }}</h2>
            <h3 class="text-gray-800 text-base leading-none mb-2">{{ entry.institution }}</h3>
            <p
              class="text-gray-700 text-sm"
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
