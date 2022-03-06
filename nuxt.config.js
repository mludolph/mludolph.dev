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
    "~plugins/components.js",
    "~plugins/filters.js",
    "~plugins/directives.js",
    "~plugins/banner.js",
    "~plugins/tracking.js",
    "~plugins/tooltip.js",
    "~plugins/draggable.js",
    "~plugins/worker-plugin.js",
    "~plugins/imutils.js",
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
    extend(config, { isClient }) {
      config.output.globalObject = "this";

      config.node = {
        fs: "empty",
        path: "empty",
        crypto: "empty",
      };

      if (isClient) {
        config.module.rules.push({
          test: /\.worker\.js$/,
          loader: "worker-loader",
          exclude: /(node_modules)/,
        });
      }
    },
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        "postcss-import": true,
        "tailwindcss/nesting": {},
        tailwindcss: {},
        "postcss-url": {},
        "postcss-responsive-type": {},
        "postcss-hexrgba": {},
        "postcss-simple-vars": {},
      },

      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true,
        },
        stage: 0,
        features: {
          "nesting-rules": false,
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
    exclude: [
      "/posts/pca",
      "/posts/test",
      "/apps/segment",
      "/apps/classify",
      "/apps/bayes",
    ],
  },
  components: {
    dirs: [
      "~/components",
      "~/components/Classify",
      "~/components/Home",
      "~/components/Segment",
    ],
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
    fallback: true,
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
        "faPencil",
        "faTrash",
        "faPlus",
        "faVideo",
        "faUpload",
        "faXmark",
        "faCameraRotate",
        "faCircle",
        "faFolder",
        "faDownload",
        "faAngleRight",
        "faAngleLeft",
        "faUpRightFromSquare",
        "faGrip",
        "faCropSimple",
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
