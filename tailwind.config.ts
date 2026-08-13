import type { Config } from "tailwindcss";

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
    },
  },
  plugins: [],
};
export default config;
