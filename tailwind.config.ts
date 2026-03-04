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
        theme: {
          primary: "var(--primary)",
          bg: "var(--bg)",
          card: "var(--card)",
          text: "var(--text)",
          border: "var(--border)"
        }
      }
    },
  },
  plugins: [],
};
export default config;
