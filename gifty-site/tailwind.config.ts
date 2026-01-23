import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        "soft": "0 12px 40px rgba(0,0,0,0.08)"
      }
    },
  },
  plugins: [typography],
} satisfies Config;
