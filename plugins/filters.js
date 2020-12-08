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

Vue.filter("truncate", function (text, length, clamp) {
  text = text || "";
  clamp = clamp || "...";
  length = length || 30;

  if (text.length <= length) return text;

  var tcText = text.slice(0, length - clamp.length);
  var last = tcText.length - 1;

  while (last > 0 && tcText[last] !== " " && tcText[last] !== clamp[0])
    last -= 1;

  // Fix for case when text dont have any `space`
  last = last || length - clamp.length;

  tcText = tcText.slice(0, last);

  return tcText + clamp;
});

Vue.filter("round", function (number, decimals) {
  decimals = decimals || 2;

  if (!number) {
    return "";
  }

  return number.toFixed(decimals);
});
