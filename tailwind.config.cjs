const daisyui_themes = require("daisyui/src/theming/themes");
const cupcake = daisyui_themes["[data-theme=cupcake]"];
const night = daisyui_themes["[data-theme=night]"];

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{css,ts,html}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...cupcake
        },
        dark: {
          ...cupcake,
          ...night,
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
