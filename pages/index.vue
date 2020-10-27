<template>
  <div v-fragment>
    <section class="container main-container">
      <div class="main-body">
        <div class="columns hero-banner">
          <div class="column">
            <div class="profile is-flex">
              <div class="image profile-image is-96x96 is-align-self-center">
                <img class="is-rounded" src="images/profile_square.jpg" />
              </div>

              <div class="is-flex is-flex-direction-column">
                <div class="is-size-5">
                  I am
                </div>
                <h1 class="title is-size-3 is-white-space-nowrap">
                  Moritz Ludolph
                </h1>
                <h2 class="subtitle is-size-6 mb-1">
                  M.Sc. student @ TU Berlin
                </h2>
                <social-links></social-links>
              </div>
            </div>
          </div>

          <div class="column">
            <p class="mb-4">
              Pragmatic problem solver and aspiring machine learning engineer.
            </p>
            <button class="button is-hero is-medium">
              <span
                class="has-text-light has-weight-bold is-size-6 is-uppercase"
                >projects</span
              >
            </button>
          </div>
        </div>
      </div>
      <hr />
    </section>
    <section class="container main-container mb-6">
      <h1 class="title is-size-3 has-text-centered">My Interests</h1>
      <div class="columns is-multiline">
        <div
          v-for="(interest, i) in interests"
          v-bind:key="i"
          class="column is-one-third-desktop"
        >
          <div
            class="is-flex is-flex-direction-column is-align-items-center is-text-centered is-width-100 px-2 py-2 mt-6"
          >
            <font-awesome-icon :icon="interest.icon" size="2x" />
            <h2 class="title is-size-6 mt-5 mb-4">{{ interest.title }}</h2>
            <p class="is-size-7" style="max-width: 300px;">
              {{ interest.description }}
            </p>
          </div>
        </div>
      </div>
      <hr />
    </section>
    <section class="container main-container mb-6">
      <h1 class="title is-size-3 has-text-centered">My Experience</h1>
      <div class="timeline is-centered">
        <header class="timeline-header">
          <span class="tag is-primary">Today</span>
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
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutMe",
  data() {
    return {
      interests: [
        {
          icon: ["fas", "graduation-cap"],
          title: "Machine Learning",
          description: "Machine Learning",
        },
        {
          icon: ["far", "comment"],
          title: "NLP",
          description: "Sentinment Analysis",
        },
        {
          icon: ["fas", "box-open"],
          title: "Cloud Computing",
          description: "Cloud Computing Architecture",
        },
        {
          icon: ["fas", "code"],
          title: "APIs",
          description: "APIs",
        },
        {
          icon: ["fas", "code"],
          title: "Internet of Things",
          description: "Inter of Things",
        },
      ],
    };
  },
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
