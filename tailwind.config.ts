import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        card: "var(--card)",
        panel: "var(--panel)",
        raise: "var(--raise)",
        line: {
          DEFAULT: "var(--line)",
          hi: "var(--line-hi)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          2: "var(--ink-2)",
          3: "var(--ink-3)",
        },
        indigo: {
          DEFAULT: "var(--indigo)",
          deep: "var(--indigo-deep)",
          dim: "var(--indigo-dim)",
          lift: "var(--indigo-lift)",
          mist: "var(--indigo-mist)",
          wash: "var(--indigo-wash)",
        },
        amber: {
          DEFAULT: "var(--amber)",
          deep: "var(--amber-deep)",
          mist: "var(--amber-mist)",
          wash: "var(--amber-wash)",
        },
        teal: {
          DEFAULT: "var(--teal)",
          deep: "var(--teal-deep)",
          wash: "var(--teal-wash)",
        },
        rose: {
          DEFAULT: "var(--rose)",
          deep: "var(--rose-deep)",
          wash: "var(--rose-wash)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        shimmer: {
          "100%": { transform: "translateX(150%)" },
        },
      },
      animation: {
        blob: "blob 7s infinite",
        shimmer: "shimmer 2.5s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
