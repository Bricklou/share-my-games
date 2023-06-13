const daisyui_themes = require("daisyui/src/theming/themes");
const halloween = daisyui_themes["[data-theme=halloween]"];
const garden = daisyui_themes["[data-theme=garden]"];

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
          ...garden,
          "--rounded-btn": "0",
        },
        dark: {
          ...halloween,
          "--rounded-btn": "0",
          primary: garden.primary,
          secondary: garden.secondary,
          "secondary-content": garden["secondary-content"],
          accent: garden.accent,
          "accent-content": garden["accent-content"],
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
