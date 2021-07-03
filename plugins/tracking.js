import Vue from "vue";
import VueGtag from "vue-gtag";

export default ({ app }) => {
  Vue.use(
    VueGtag,
    {
      config: { id: "G-Q4GGS7VXZ8" },
      enabled: false,
    },
    app.router
  );
  console.log(app.router);
};
