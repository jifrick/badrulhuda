import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          light: "var(--color-primary-light)",
          dark: "var(--color-primary-dark)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          light: "var(--color-accent-light)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          alt: "var(--color-surface-alt)",
        },
        textColor: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        border: "var(--color-border)",
      },
      fontFamily: {
        amiri: ["var(--font-amiri)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        scheherazade: ["var(--font-scheherazade)", "serif"],
        cairo: ["var(--font-cairo)", "sans-serif"],
        "noto-kufi": ["var(--font-noto-kufi)", "sans-serif"],
        "aref-ruqaa": ["var(--font-aref-ruqaa)", "serif"],
        "el-messiri": ["var(--font-el-messiri)", "sans-serif"],
        tajawal: ["var(--font-tajawal)", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1.15" }],
        "display-xl": ["3.5rem", { lineHeight: "1.2" }],
        "display-lg": ["2.75rem", { lineHeight: "1.25" }],
        "display-md": ["2rem", { lineHeight: "1.3" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.5" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "caption": ["0.75rem", { lineHeight: "1.4" }],
      },
    },
  },
  plugins: [],
};

export default config;
