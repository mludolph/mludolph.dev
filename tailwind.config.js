const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  important: true,
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Poppins",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        blog: "Raleway",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
      backgroundColor: ["disabled"],
      textColor: ["disabled"],
      cursor: ["disabled"],
    },
  },
};
