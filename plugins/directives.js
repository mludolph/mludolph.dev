import Vue from "vue";

Vue.directive("fragments", {
  inserted: function (el) {
    const children = Array.from(el.children);
    const parent = el.parentElement;
    children.forEach((item) => {
      parent.appendChild(item);
    });
    parent.removeChild(el);
  },
});
