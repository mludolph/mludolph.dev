<template>
  <div class="mt-4">
    <section class="container max-w-content m-auto mb-4">
      <div class="dots"></div>
      <div class="dots-vertical"></div>
      <div class="transition duration-300 ease-in-out">
        <div
          class="
            flex flex-col
            items-center
            md:items-start
            text-center
            md:text-left
            md:flex-row
            md:justify-between
          "
        >
          <v-card />
          <div class="flex flex-col max-w-sm md:self-end mt-4 md:mt-0">
            <p class="text-gray-800 dark:text-gray-300 text-sm font-sans">
              I'm a {{ age }}-year old
              <b class="font-semibold">Computer Science</b> student from
              Germany, currently living in Berlin. I enjoy building things and
              solving problems in a fast and impactful way. Currently I'm mainly
              interested in machine learning, cloud computing and IoT.
            </p>
            <p class="text-gray-800 dark:text-gray-300 text-sm mt-2">
              In my free time I love hiking, playing the piano and producing
              music. Feel free to shoot me an
              <a class="text-indigo-400" href="mailto:contact@moritzludolph.de"
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
            class="
              text-2xl text-gray-800
              dark:text-gray-300
              font-light
              w-full
              text-center
              mb-0
            "
          >
            education & experience
          </h1>
        </div>

        <div class="timeline is-centered">
          <header class="timeline-header">
            <span
              class="
                text-xs
                uppercase
                font-semibold
                bg-indigo-400
                py-1
                px-2
                rounded
                text-white
              "
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
                class="
                  text-gray-700
                  dark:text-gray-400
                  text-xs
                  font-semibold
                  uppercase
                "
              >
                {{ period | formatPeriod }}
              </p>
              <h2
                class="
                  text-gray-800
                  dark:text-gray-300
                  text-lg
                  font-bold
                  leading-1
                "
              >
                {{ entry.title }}
              </h2>
              <h3
                class="
                  text-gray-800
                  dark:text-gray-300
                  text-base
                  leading-none
                  mb-2
                "
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
import getSiteMeta from "@/utils/getSiteMeta";
import { mapGetters } from "vuex";

export default {
  name: "resume",
  computed: {
    ...mapGetters({ timelineEntries: "timeline/getTimelineEntries" }),
    age() {
      return this.$moment().diff("1996-11-15", "years");
    },
    meta() {
      const metaData = {
        title: "Moritz Ludolph | About me",
        url: "https://www.mludolph.dev",
      };
      return getSiteMeta(metaData);
    },
  },
  head() {
    return {
      title: "Moritz Ludolph | About me",
      meta: [...this.meta],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: "https://www.mludolph.dev/aboutme",
        },
      ],
    };
  },
};
</script>

<style lang="css">
.timeline-content {
  max-width: 400px;
}
</style>
