import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      "brown": "#87321b",
      "lightbrown": "#f3a060",
      "skin": "#fdcd90",
      "darkgray": "#424143",
      "lightgray": "#6a747d",
    },
    extend: {
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config