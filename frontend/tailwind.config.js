/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#DC2626",
        primaryDark: "#B91C1C",
        lightRed: "#FEE2E2",
      },
    },
  },
  plugins: [],
};