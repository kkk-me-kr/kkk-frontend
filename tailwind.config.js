/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light theme colors
        primary: {
          light: "#10a37f",
          DEFAULT: "#10a37f",
          dark: "#1a7f64",
        },
        // Dark theme colors
        dark: {
          bg: "#343541",
          sidebar: "#202123",
          border: "#4a4b53",
          text: "#ececf1",
          hover: "#2a2b32",
        },
      },
    },
  },
  plugins: [],
};
