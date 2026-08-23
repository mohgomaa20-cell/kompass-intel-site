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
        background: "#0B0F16",
        foreground: "#E6E6E6",
        kompass: {
          bg: "#0B0F16",
          card: "#111722",
          cardLight: "#141C2B",
          border: "rgba(0, 214, 198, 0.15)",
          borderAlternative: "#1B2638",
          text: "#E6E6E6",
          muted: "#7A889B",
          teal: "#00D6C6",
        },
        intel: {
          violet: "#6454c8",
          blue: "#78b0e2",
          green: "#6cd0a4",
          orange: "#e08a64",
        }
      },
      fontFamily: {
        sans: ["'Exo 2'", "Inter", "system-ui", "sans-serif"],
        condensed: ["'Exo 2'", "Inter", "system-ui", "sans-serif"],
      },
      borderWidth: {
        "0.5": "0.5px",
      }
    },
  },
  plugins: [],
};
export default config;
