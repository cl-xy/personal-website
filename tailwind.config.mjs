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
        'case-bg': '#F8F9FA',
        'case-surface': '#FFFFFF',
        'case-border': '#E5E7EB',
        'case-slate': '#1F2937',
        'case-muted': '#6B7280',
        'case-accent': '#4F46E5',
        'case-red': '#DC2626',
        'case-green': '#059669',
        'case-amber': '#D97706',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
