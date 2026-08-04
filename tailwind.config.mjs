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
        'atlas-bg': '#FAF6F0',
        'atlas-cream': '#F5EDE4',
        'atlas-terracotta': '#C96F4A',
        'atlas-sage': '#7B9E87',
        'atlas-amber': '#D4A04A',
        'atlas-slate': '#2D3748',
        'atlas-muted': '#8B7E74',
        'atlas-border': '#E2D9CF',
        'atlas-surface': '#FFFCF8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
