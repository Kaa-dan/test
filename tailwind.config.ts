import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-black": "#100C08",
        "primary-white": "#FFFFFF",
        "primary-orange": "#ff7542",
      },
      fontFamily: {
        oswald: "Oswald",
      }
    },
  },
  plugins: [],
} satisfies Config;
