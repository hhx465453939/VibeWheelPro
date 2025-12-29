import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FDFCF8",
        },
        sage: {
          DEFAULT: "#8DA399",
          light: "#A8B8A6",
          dark: "#6B8A7A",
        },
      },
      backgroundColor: {
        "warm-white": "#FDFCF8",
      },
    },
  },
  plugins: [],
}
export default config

