import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        blink: {
          "0%, 100%": {
            opacity: "100",
          },
          "50%": {
            opacity: "0",
          },
        },
      },
      animation: {
        blink: "blink 1.2s steps(1) infinite",
      },
      colors: {
        light: "rgb(var(--theme-light) / <alpha-value>)",
        dark: "rgb(var(--theme-dark) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
