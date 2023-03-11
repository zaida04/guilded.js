const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

delete colors["lightBlue"];
delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-mono)", ...fontFamily.sans],
      },
      colors: {
        ...colors,
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
