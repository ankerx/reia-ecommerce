/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = withMT({
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./modules/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#FFF8F4",
        second: "#A87E72",
      },
      fontFamily: {
        OldStandard: ["Old Standard TT", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: { cursor: ["hover", "focus"] },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
});

// , require("@tailwindcss/forms")
