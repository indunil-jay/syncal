import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import { shadcnPlugin } from "./app/_lib/tailwinds/shadcn-plugin";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  plugins: [animatePlugin, shadcnPlugin],
} satisfies Config;
