import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F5F0",
        navy: {
          DEFAULT: "#0B1F3A",
          50: "#EEF1F6",
          100: "#D6DCE8",
          200: "#AEB9D0",
          300: "#8596B8",
          400: "#5D739F",
          500: "#3A5280",
          600: "#28406A",
          700: "#1A2F52",
          800: "#0F213D",
          900: "#0B1F3A",
          950: "#070F1D",
        },
        accent: {
          DEFAULT: "#1C4E9C",
          light: "#EAF1FB",
          hover: "#163E7D",
        },
        risk: {
          low: "#2F6F4E",
          moderate: "#8A6D1D",
          high: "#9C3B2E",
          veryhigh: "#7A2331",
        },
      },
      fontFamily: {
        serif: [
          "Iowan Old Style",
          "Georgia",
          "Source Serif Pro",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11, 31, 58, 0.06), 0 1px 8px rgba(11, 31, 58, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
