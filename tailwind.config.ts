import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif-jp)", "serif"],
        sans: ["var(--font-sans-jp)", "sans-serif"],
      },
      colors: {
        sumi: {
          950: "#0b0b0e",
          900: "#121216",
          800: "#1a1a21",
          700: "#24242e",
          600: "#32323f",
        },
        torii: {
          500: "#dc2626",
          600: "#b91c1c",
          700: "#991b1b",
          glow: "#ff334b",
        },
        kogane: {
          400: "#facc15",
          500: "#d4af37",
          600: "#b89628",
        },
        bamboo: {
          50: "#faf8f5",
          100: "#f4efe6",
          200: "#e7decb",
          300: "#d3c4a8",
        },
      },
    },
  },
  plugins: [],
};
export default config;
