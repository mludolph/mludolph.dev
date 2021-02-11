import getSiteMeta from "./utils/getSiteMeta";
import getRoutes from "./utils/getRoutes";

const meta = getSiteMeta();

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    htmlAttrs: {
      lang: "en-GB",
    },
    title: "Moritz Ludolph | M.Sc. CS student",
    meta: [
      { charset: "utf-8" },
      { name: "HandheldFriendly", content: "True" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...meta,
    ],

    link: [
      {
        hid: "canonical",
        rel: "canonical",
        href: "https://mludolph.dev",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
  },
  /*
   ** Global CSS
   */
  css: ["~assets/styles/theme.scss"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ["~plugins/filters.js", "~plugins/directives.js"],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/moment",
    "@nuxtjs/tailwindcss",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    //"nuxt-buefy",
    "nuxt-fontawesome",

    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxt/content",

    "@nuxtjs/sitemap",
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  sitemap: {
    hostname: "https://www.mludolph.dev",
    routes() {
      return getRoutes();
    },
  },

  content: {
    markdown: {
      remarkPlugins: ["remark-math"],
      rehypePlugins: ["rehype-mathjax"],
      prism: {
        theme: "prism-themes/themes/prism-material-oceanic.css",
      },
    },
  },
  fontawesome: {
    component: "font-awesome-icon",

    imports: [
      {
        set: "@fortawesome/free-solid-svg-icons",
        icons: ["fas"],
      },
      { set: "@fortawesome/free-brands-svg-icons", icons: ["fab"] },
      { set: "@fortawesome/free-regular-svg-icons", icons: ["far"] },
    ],
  },
  hooks: {
    "content:file:beforeInsert": (document) => {
      if (document.extension === ".md") {
        var count = require("word-count");
        document.readingTime = Math.max(
          Math.round(count(document.text) / 200),
          1
        );
      }
    },
  },
  tailwindcss: {
    configPath: "~/tailwind.config.js",
  },
  router: {},
};
