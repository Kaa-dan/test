import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // If using App Router
    "./src/**/*.{js,ts,jsx,tsx}", // If your files are in src directory
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
        mulish: "Mulish"
      }
    },
  },
  plugins: [],
} satisfies Config;
