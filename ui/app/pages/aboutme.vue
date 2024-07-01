<template>
  <div class="mt-4">
    <section class="container max-w-content m-auto mb-4">
      <div class="dots"></div>
      <div class="dots-vertical"></div>
      <div class="transition duration-300 ease-in-out">
        <div class="
            flex flex-col
            items-center
            md:items-start
            text-center
            md:text-left md:flex-row md:justify-between
          ">
          <v-card class="mx-auto" />
        </div>
      </div>
      <hr class="mt-6 mx-4 dark:bg-gray-600" />
    </section>

    <section class="container max-w-content mx-auto">
      <div class="flex items-center mb-6 w-full">
        <h1 class="
              text-2xl text-gray-800
              dark:text-gray-300
              font-light
              w-full
              text-center
              mb-0
            ">
          About me
        </h1>
      </div>
      <div class="flex flex-col md:self-end mt-4 md:mt-0 gap-y-2">
        <p class="text-gray-800 dark:text-gray-300 font-sans">
          Ever since the age of 11 I have been hooked by the idea of writing software to solve problems in one way or
          another.
          During a prolonged summer holiday in which I caught a bad sun allergy and had to stay inside for weeks
          straight, I was able to discover the for me unknown depths of Microsoft Excel and its Visual Basic scripts and
          was instantly hooked.
        </p>
        <p class="text-gray-800 dark:text-gray-300 font-sans">
          Shortly after, instead of doing my maths homework, I instead wrote my first plotter to plot graphs and solve
          the questions for me (I mean, it was definitely less effort than doing the work myself, right? RIGHT???).
          And so my journey began as my new found interest accompanied all the way through school, uni and to today.
          Whether it was work done to help my dad write SAP ABAP programs, reverse engineering computer games to adjust
          them to my likings or writing
          PoC or production code for uni or work, I always enjoyed (and still do!) the endless possiblities to create
          something
          useful out of literally thin air with only a laptop and some coffee.
        </p>
        <p class="text-gray-800 dark:text-gray-300 font-sans">
          These days my interest mostly lies in Machine Learning and Data Engineering as I am most excited about what
          possibilities advancement in this frontier will bring us within the next decade - and I hope to be a part of
          that.
          While I thouroughly enjoy writing code, I value good products and everything that goes with the development of
          such just as much.
          In case you want to enquire for consulting or just have a chat with me, feel free to shoot me an <a
            class="text-indigo-400" href="mailto:contact@moritzludolph.de">email</a>!

        </p>
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
