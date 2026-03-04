import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          bg: "var(--color-bg)",
          card: "var(--color-card)",
          text: "var(--color-text)",
        }
      },
      backgroundImage: {
        "theme-gradient": "var(--bg-gradient)",
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
