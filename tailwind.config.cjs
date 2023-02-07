/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			dark: "#303030",
			orange: "#FF3C00",
			white: "#FFFFFF",
			black: "#000000",
		},
		extend: {
			gridTemplateColumns: {
				"auto-min-160px": "repeat(auto-fit, minmax(160px, 1fr))",
				"auto-min-180px": "repeat(auto-fit, minmax(180px, 1fr))",
				"auto-min-200px": "repeat(auto-fit, minmax(200px, 1fr))",
			},
		},

		screens: {
			xs: "400px",

			sm: "640px",

			md: "768px",

			lg: "1024px",

			xl: "1280px",
		},
	},
	plugins: [],
	blocklist: ["container"],
};
