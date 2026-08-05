/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bench-bg': '#1a1612',
        'bench-surface': '#2d2418',
        'bench-light': '#3e3020',
        'bench-brass': '#b8860b',
        'bench-copper': '#b87333',
        'bench-gold': '#d4a574',
        'bench-cream': '#f5f0e8',
        'bench-muted': '#8b7e6a',
        'bench-dark': '#0f0d0a',
        'bench-green': '#4a7c59',
        'bench-red': '#8b3a3a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
        hand: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
