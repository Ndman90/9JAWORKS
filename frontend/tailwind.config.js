import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				linkedin: {
					primary: "#009c22", // 9JAWORKS Green
					secondary: "#FFFFFF", // White
					accent: "#7FC15E", // LinkedIn Green (for accents)
					neutral: "#000000", // Black (for text)
					"base-100": "#ffffff", // White (background)
					info: "#000000", // Dark Gray (for secondary text)/BLACK
					success: "#057642", // Dark Green (for success messages)
					warning: "#F5C75D", // Yellow (for warnings)
					error: "#CC1016", // Red (for errors)
				},
			},
		],
	},
};
