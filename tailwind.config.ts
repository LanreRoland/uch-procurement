import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        uch: {
          green: "#004D29",
          "green-dark": "#003319",
          "green-mid": "#006633",
          "green-light": "#E8F5EE",
          gold: "#C9A227",
          "gold-light": "#E8C85A",
          "gold-dark": "#9A7B1A",
        },
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
