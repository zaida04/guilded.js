import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-mono)", ...fontFamily.sans],
			},
			borderWidth: {
				".5": ".5px",
			},
			borderColor: {
				guilded: "#F5C400",
				slate: "#292B32",
			},
			colors: {
				gray: "#191B1F",
				guilded: "#F5C400",
				black: "#111820",
				slate: "#292B32",
				white: "#ececee",
			},
		},
	},
	plugins: [],
};

export default config;
