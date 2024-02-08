/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  mode: "jit",
  darkMode: "class",

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#096BDE",
        "base-150": "var(--color-base-150)",
      },
      textColor: {
        light: "#88909B",
        light2: "#E9EAEB",
        dark: "#02152C",
        heading: "#172B4D",
        primary: "#096BDE",
      },
    },
  },
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
  plugins: [require("tailwind-scrollbar-hide"), require("daisyui")],
};
