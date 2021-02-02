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
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    script: [
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML",
      },
    ],

    link: [
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Poppins:300,500,600,700,800,900",
      },

      {
        rel: "stylehset",
        href:
          "https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900",
      },
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
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: { baseURL: "http://localhost:3000" },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  content: {
    markdown: {
      remarkPlugins: ["remark-math"],
      rehypePlugins: ["rehype-mathjax"],
      prism: {
        theme: "prism-themes/themes/prism-material-oceanic.css",
      },
    },
  },
  buefy: {
    css: false,
    materialDesignIcons: false,
    defaultIconPack: "fas",
    defaultIconComponent: "font-awesome-icon",
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
