const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  important: true,
  darkMode: "class",
  theme: {
    extend: {
      textColor: {
        primary: "#8490ff",
      },
      backgroundColor: {
        primary: "#8490ff",
      },
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
};
