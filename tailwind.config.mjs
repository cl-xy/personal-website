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
        'trace-bg': '#0D1117',
        'trace-surface': '#161B22',
        'trace-border': '#30363D',
        'trace-text': '#E6EDF3',
        'trace-muted': '#7D8590',
        'trace-green': '#3FB950',
        'trace-blue': '#58A6FF',
        'trace-orange': '#D29922',
        'trace-purple': '#BC8CFF',
        'trace-red': '#F85149',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
