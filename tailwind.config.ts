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
        neo: {
          bg: "#FFFDF5",
          black: "#000000",
          accent: "#FF6B6B",
          secondary: "#FFD93D",
          muted: "#C4B5FD",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-space-grotesk)", "sans-serif"],
      },
      boxShadow: {
        "neo-sm": "4px 4px 0px 0px #000",
        "neo-md": "8px 8px 0px 0px #000",
        "neo-lg": "12px 12px 0px 0px #000",
        "neo-xl": "16px 16px 0px 0px #000",
        "neo-sm-white": "4px 4px 0px 0px #fff",
        "neo-md-white": "8px 8px 0px 0px #fff",
        "neo-lg-white": "12px 12px 0px 0px #fff",
      },
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 10s linear infinite",
      },
    },
  },
  plugins: [],
}
export default config
