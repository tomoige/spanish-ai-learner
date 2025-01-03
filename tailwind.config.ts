import type { Config } from "tailwindcss";
import Scrollbar from "tailwind-scrollbar";

const colors = "#0D0D0D#1F1F2E#5b5bff#F92672";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        one: colors.substring(0, 7),
        two: colors.substring(7, 14),
        three: colors.substring(14, 21),
        four: colors.substring(21),
      },
    },
  },
  plugins: [Scrollbar],
} satisfies Config;
