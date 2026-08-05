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
        'trace-bg': '#0a0e14',
        'trace-surface': '#151b23',
        'trace-border': '#262c36',
        'trace-text': '#e2e8f0',
        'trace-muted': '#6b7280',
        'trace-green': '#3FB950',
        'trace-blue': '#5eaeff',
        'trace-orange': '#e5a010',
        'trace-purple': '#c49cff',
        'trace-red': '#f85149',
        'trace-surface-2': '#1c2230',
        'trace-border-subtle': '#1e2430',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up': 'fade-up 0.2s ease-out',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(63, 185, 80, 0.15), 0 0 60px rgba(63, 185, 80, 0.05)',
        'glow-blue': '0 0 16px rgba(94, 174, 255, 0.12), 0 0 40px rgba(94, 174, 255, 0.04)',
        'glow-orange': '0 0 16px rgba(229, 160, 16, 0.12), 0 0 40px rgba(229, 160, 16, 0.04)',
        'glow-purple': '0 0 16px rgba(196, 156, 255, 0.12), 0 0 40px rgba(196, 156, 255, 0.04)',
        'inner-highlight': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.03)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
