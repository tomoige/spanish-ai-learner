import type { Config } from "tailwindcss";

const colors = "#181C14#3C3D37#697565#ECDFCC";

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
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
