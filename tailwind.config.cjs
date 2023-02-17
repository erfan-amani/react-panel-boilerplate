/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        lightBlue: {
          200: "rgb(186, 230, 253)",
          300: "rgb(125, 211, 252)",
          400: "rgb(56, 189, 248)",
          500: "rgb(14, 165, 233)",
          600: "rgb(2, 132, 199)",
          800: "rgb(7, 89, 133)",
          900: "rgb(12, 74, 110)",
        },
        blueGray: {
          50: "rgb(248, 250, 252)",
          100: "rgb(241, 245, 249)",
          200: "rgb(226, 232, 240)",
          300: "rgb(203, 213, 225)",
          500: "rgb(100, 116, 139)",
          600: "rgb(71, 85, 105)",
          700: "rgb(51, 65, 85)",
          800: "rgb(30, 41, 59)",
        },
      },
      maxWidth: {
        "150-px": "150px",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        mono: ["Poppins", "sans-serif"],
        serif: ["Poppins", "sans-serif"],
        number: ["Monospace", "Poppins", "sans-serif"],
      },
      width: {
        sidebar: "73px",
      },
      margin: {
        sidebar: "73px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addComponents, theme }) {
      const screens = theme("screens", {});
      addComponents([
        {
          ".container": { width: "100%" },
        },
        {
          [`@media (min-width: ${screens.sm})`]: {
            ".container": {
              "max-width": "640px",
            },
          },
        },
        {
          [`@media (min-width: ${screens.md})`]: {
            ".container": {
              "max-width": "768px",
            },
          },
        },
        {
          [`@media (min-width: ${screens.lg})`]: {
            ".container": {
              "max-width": "1024px",
            },
          },
        },
        {
          [`@media (min-width: ${screens.xl})`]: {
            ".container": {
              "max-width": "1280px",
            },
          },
        },
        {
          [`@media (min-width: ${screens["2xl"]})`]: {
            ".container": {
              "max-width": "1280px",
            },
          },
        },
      ]);
    }),
  ],
};
