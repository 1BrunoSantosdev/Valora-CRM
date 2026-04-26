/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        valora: {
          primary: "#7A1C1C",
          primaryDark: "#5A1414",
          accent: "#C9A75D",
          bg: "#0F0F0F",
          card: "#1A1A1A",
          border: "#2A2A2A",
          text: "#E5E5E5",
          muted: "#888888",
        },
      },
    },
  },
  plugins: [],
};