const garden = require('daisyui/src/colors/themes')['[data-theme=garden]'];
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['src/**/*.{tsx,css,ts}'],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: [
			{
				light: {
					...garden,
					'--rounded-btn': '0',
				},
				dark: {
					...require('daisyui/src/colors/themes')['[data-theme=halloween]'],
					'--rounded-btn': '0',
					primary: garden.primary,
					secondary: garden.secondary,
					'secondary-content': garden['secondary-content'],
					accent: garden.accent,
					'accent-content': garden['accent-content'],
				},
			},
		],
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
