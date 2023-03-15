/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["src/**/*.{tsx,css,ts}"],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                garden: {
                    ...require("daisyui/src/colors/themes")["[data-theme=garden]"],
                    "--rounded-btn": "0",
                },
            },
        ],
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
