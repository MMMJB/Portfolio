/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}", "./*.html"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        background: "#1D2731",
        cursor: "#34404D",
      },
    },
    fontFamily: {
      monospace: ["Source Code Pro", "monospace"],
    },
  },
  plugins: [],
};
