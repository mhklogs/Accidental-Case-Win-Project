import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f5fb",
          100: "#dce7f5",
          200: "#bccfe9",
          300: "#8fadda",
          400: "#5c85c6",
          500: "#3865ae",
          600: "#284e90",
          700: "#213e74",
          800: "#1d3560",
          900: "#0b1f3a",
          950: "#071426",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        serif: ["Instrument Serif", "Georgia", "serif"],
        sans: [
          "Outfit",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 2px 12px rgba(11, 31, 58, 0.08)",
        lifted: "0 12px 32px rgba(11, 31, 58, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
