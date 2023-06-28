/** @type {import('postcss').Postcss} */
module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {},
  },
};
