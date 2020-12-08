<template>
  <div class="inline-block">
    <a
      v-for="(social, i) in socialLinks"
      v-bind:key="i"
      :href="social.link"
      class="text-lg text-gray-800 hover:text-gray-500 mr-3"
    >
      <font-awesome-icon
        :icon="['fab', social.icon]"
        :type="{ 'is-light': theme == 'light' }"
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
