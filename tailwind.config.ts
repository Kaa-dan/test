import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-black": "#100C08",
        "primary-white": "#FFFFFF",
        "primary-orange": "#ff7542",
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        mulish: ["Mulish", "sans-serif"]
      }
    },
  },
  plugins: [],
};

export default config;