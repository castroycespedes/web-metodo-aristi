import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px"
    },
    extend: {
      colors: {
        brand: {
          black: "rgb(var(--color-brand-black) / <alpha-value>)",
          graphite: "rgb(var(--color-brand-graphite) / <alpha-value>)",
          panel: "rgb(var(--color-brand-panel) / <alpha-value>)",
          cyan: "rgb(var(--color-brand-cyan) / <alpha-value>)",
          cyanDark: "rgb(var(--color-brand-cyan-dark) / <alpha-value>)",
          white: "rgb(var(--color-brand-white) / <alpha-value>)",
          steel: "rgb(var(--color-brand-steel) / <alpha-value>)",
          line: "rgb(var(--color-brand-line) / <alpha-value>)",
          navy: "rgb(var(--color-brand-black) / <alpha-value>)",
          green: "rgb(var(--color-brand-cyan) / <alpha-value>)",
          gold: "rgb(var(--color-brand-cyan) / <alpha-value>)",
          ink: "rgb(var(--color-brand-white) / <alpha-value>)"
        },
        surface: "rgb(var(--color-brand-black) / <alpha-value>)",
        muted: "rgb(var(--color-brand-steel) / <alpha-value>)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial", "sans-serif"],
        sans: ["var(--font-body)", "Inter", "Arial", "sans-serif"]
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
        34: "8.5rem"
      },
      backgroundImage: {
        "neon-radial":
          "radial-gradient(circle at 50% 0%, rgb(var(--color-brand-cyan) / 0.28), transparent 34%), radial-gradient(circle at 85% 30%, rgb(var(--color-brand-cyan) / 0.16), transparent 24%)",
        "field-lines":
          "linear-gradient(90deg, rgb(var(--color-brand-cyan) / 0.08) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
        "aqua-sweep":
          "linear-gradient(135deg, rgb(var(--color-brand-cyan)) 0%, rgb(var(--color-brand-cyan-dark)) 68%, #006f73 100%)",
        "dark-section": "linear-gradient(180deg, #020403 0%, #071010 100%)"
      },
      boxShadow: {
        soft: "0 18px 50px rgb(0 0 0 / 0.38)",
        glow: "0 0 22px rgb(var(--color-brand-cyan) / 0.36)",
        "glow-strong": "0 0 34px rgb(var(--color-brand-cyan) / 0.55)",
        insetGlow: "inset 0 0 28px rgb(var(--color-brand-cyan) / 0.12)"
      },
      animation: {
        "pulse-glow": "pulse-glow 2.8s ease-in-out infinite",
        "scan-line": "scan-line 7s linear infinite",
        float: "float 5s ease-in-out infinite",
        "card-rise": "card-rise 700ms ease-out both"
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 16px rgb(var(--color-brand-cyan) / 0.28)" },
          "50%": { boxShadow: "0 0 34px rgb(var(--color-brand-cyan) / 0.58)" }
        },
        "scan-line": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "card-rise": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
