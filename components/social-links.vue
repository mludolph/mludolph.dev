<template>
  <div class="is-inline-block">
    <button
      v-for="(social, i) in socialLinks"
      v-bind:key="i"
      :href="social.link"
      class="button is-transparent contact-icon px-3 py-0 my-0 mr-2 is-medium has-border-none has-shadow-none"
    >
      <b-icon
        pack="fab"
        :icon="social.icon"
        :type="{ 'is-light': theme == 'light' }"
      ></b-icon>
    </button>
  </div>
</template>

<script>
export default {
  name: "SocialLinks",
  props: {
    theme: {
      type: String,
      default: "dark",
    },
  },
  data() {
    return {
      socialLinks: [
        {
          icon: "github",
          link: "https://github.com/mludolph",
        },
        {
          icon: "twitter",
          link: "https://twitter.com/mludolph",
        },
        {
          icon: "linkedin",
          link: "",
        },
        {
          icon: "medium",
          link: "",
        },
      ],
    };
  },
};
</script>
