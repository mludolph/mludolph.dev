<template>
  <div class="inline-block">
    <a
      v-for="(social, i) in socialLinks"
      v-bind:key="i"
      :href="social.link"
      :aria-label="social.name"
      class="text-lg mr-3 text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400"
    >
      <font-awesome-icon
        :icon="social.icon"
        :type="{ 'is-light': theme == 'dark' }"
        :class="social.classes"
      ></font-awesome-icon>
    </a>
  </div>
</template>

<script>
export default {
  name: "social-links",
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
          name: "GitHub",
          icon: ["fab", "github"],
          link: "https://github.com/mludolph",
        },
        {
          name: "Twitter",
          icon: ["fab", "twitter"],
          link: "https://twitter.com/mludolph",
        },
        {
          name: "LinkedIn",
          icon: ["fab", "linkedin"],
          link: "https://de.linkedin.com/in/moritzludolph",
        } /*
        {
          icon: ["fab", "medium"],
          link: "",
        },*/,
        {
          name: "Email",
          icon: ["fas", "envelope"],
          link: "mailto:contact@moritzludolph.de",
        },
      ],
    };
  },
};
</script>
