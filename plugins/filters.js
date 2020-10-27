import Vue from "vue";
import moment from "moment";

Vue.filter("formatDate", (value) => {
  if (!value) return "";
  return moment(value).format("ll");
});

Vue.filter("formatDate2", (value) => {
  if (value === "ongoing") return value;
  if (value === "today") return value;
  if (!value) return "";
  return moment(value).format("MMM YYYY");
});

Vue.filter("readTime", (value) => {
  if (!value) return "";
  return Math.round(value / 200);
});
