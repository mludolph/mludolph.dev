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
    title: "Moritz Ludolph | ML & SWE",
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
  css: ["~assets/styles/theme.css"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    "~/plugins/components",
    "~plugins/filters.js",
    "~plugins/directives.js",
    "~plugins/banner.js",
    "~plugins/tracking.js",
    "~plugins/tooltip.js",
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // "@nuxt/typescript-build",
    "@nuxtjs/color-mode",
    "@nuxtjs/moment",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/fontawesome",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    //"nuxt-buefy",
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
  build: {
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        "postcss-url": {},
        "postcss-nested": {},
        "postcss-responsive-type": {},
        "postcss-hexrgba": {},
        precss: {},
      },

      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true,
        },
        stage: 3,
        features: {
          "nesting-rules": true,
        },
      },
    },
  },
  colorMode: {
    classSuffix: "",
  },
  loadingIndicator: {
    name: "~/loading-indicator.html",
  },
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
        theme: false, // "prism-themes/themes/prism-material-oceanic.css",
      },
    },
  },
  generate: {
    routes() {
      return getRoutes();
    },
  },
  fontawesome: {
    component: "font-awesome-icon",

    icons: {
      solid: [
        "faEnvelope",
        "faMoon",
        "faSun",
        "faArrowLeft",
        "faCodeBranch",
        "faSquareRootAlt",
        "faHeart",
        "faExternalLinkAlt",
        "faPencilAlt",
        "faTrash",
        "faPlus",
        "faVideo",
        "faUpload",
        "faTimes",
        "faSync",
        "faCircle",
        "faFolder",
        "faDownload",
        "faAngleRight",
        "faAngleLeft",
      ],
      regular: ["faStar", "faFloppyDisk"],
      brands: [
        "faGithub",
        "faTwitter",
        "faLinkedin",
        "faMedium",
        "faPython",
        "faJsSquare",
        "faJava",
        "faVuejs",
        "faAngular",
        "faReact",
        "faSass",
        "faGoogleDrive",
      ],
    },
  },
  googleFonts: {
    families: {
      Poppins: true,
      Raleway: true,
      // or:
      // Lato: [100, 300],
      // Raleway: {
      //   wght: [100, 400],
      //   ital: [100]
      // },
    },
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
  purgeCSS: {
    whitelist: ["dark"],
  },
};
