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
          ...cupcake,
        },
        dark: {
          ...night,
          // Add some cupcake configurations
          "--rounded-btn": cupcake["--rounded-btn"],
          "--tab-border": cupcake["--tab-border"],
          "--tab-radius": cupcake["--tab-radius"],
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
