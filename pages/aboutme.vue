<template>
  <div>
    <section class="container max-w-content m-auto mb-4">
      <div class="dots"></div>
      <div class="dots-vertical"></div>
      <div class="transition duration-300 ease-in-out">
        <div
          class="flex flex-col items-start text-center sm:text-left sm:flex-row sm:justify-between"
        >
          <div class="flex flex-col sm:flex-row sm:w-content items-center">
            <div class="w-24 h-24 mb-4 mr-0 sm:mr-4 sm:mb-0">
              <img class="rounded-full" src="images/profile_square.jpg" />
            </div>

            <div class="flex flex-col">
              <div
                class="text-lg font-secondary text-gray-800 dark:text-gray-300"
              >
                Hi! I'm
              </div>
              <h1
                class="text-3xl text-gray-800 dark:text-gray-300 font-secondary whitespace-no-wrap leading-none"
              >
                Moritz Ludolph
              </h1>
              <h2 class="text-base text-gray-800 dark:text-gray-300 font-sans">
                M.Sc. student @ TU Berlin
              </h2>
              <div
                class="text-xs text-gray-600 dark:text-gray-400 font-secondary mb-1"
              >
                Machine Learning - Software Engineering
              </div>
              <social-links></social-links>
            </div>
          </div>
          <div
            class="flex flex-col max-w-sm self-center sm:self-end mt-4 sm:mt-0"
          >
            <p class="text-gray-800 dark:text-gray-300 text-sm font-sans">
              I'm a {{ age }}-year old
              <b class="font-semibold">Computer Science</b> student from
              Germany, currently living in Berlin. Learning new things and
              solving problems are things that I enjoy thoroughly. Currently I'm
              mainly interested in machine learning, cloud computing and product
              development.
            </p>
            <p class="text-gray-800 dark:text-gray-300 text-sm mt-2">
              In my free time I love hiking, playing the piano and producing
              music. Feel free to shoot me an
              <a class="text-primary" href="mailto:contact@moritzludolph.de"
                >email</a
              >
              if you like!
            </p>
          </div>
        </div>
      </div>
      <hr class="mt-6 mx-4 dark:bg-gray-600" />
    </section>

    <section class="container max-w-content mx-auto">
      <div class="">
        <div class="flex items-center mb-6 w-full">
          <h1
            class="text-2xl text-gray-800 dark:text-gray-300 font-light w-full text-center mb-0"
          >
            education & experience
          </h1>
        </div>

        <div class="timeline is-centered">
          <header class="timeline-header">
            <span
              class="text-xs uppercase font-semibold bg-primary py-1 px-2 rounded text-white"
              >today</span
            >
          </header>
          <div
            v-for="(entry, i) in timelineEntries"
            v-bind:key="i"
            class="timeline-item"
          >
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <p
                v-for="(period, j) in entry.periods"
                :key="j"
                class="text-gray-700 dark:text-gray-400 text-xs font-semibold uppercase"
              >
                {{ period | formatPeriod }}
              </p>
              <h2
                class="text-gray-800 dark:text-gray-300 text-lg font-bold leading-1"
              >
                {{ entry.title }}
              </h2>
              <h3
                class="text-gray-800 dark:text-gray-300 text-base leading-none mb-2"
              >
                {{ entry.institution }}
              </h3>
              <p
                class="text-gray-700 dark:text-gray-400 text-sm"
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
  </div>
</template>

<script>
export default {
  name: "resume",
  computed: {
    timelineEntries() {
      return this.$store.state.timelineEntries;
    },
    age() {
      return this.$moment().diff("1996-11-15", "years");
    },
  },
};
</script>

<style lang="scss">
.timeline-content {
  max-width: 400px;
}
</style>
