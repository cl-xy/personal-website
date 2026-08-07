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
        // Agent Trace
        'trace-bg': '#0a0e14',
        'trace-surface': '#151b23',
        'trace-surface-2': '#1c2230',
        'trace-border': '#262c36',
        'trace-border-subtle': '#1e2430',
        'trace-text': '#e2e8f0',
        'trace-muted': '#6b7280',
        'trace-green': '#3FB950',
        'trace-blue': '#5eaeff',
        'trace-orange': '#e5a010',
        'trace-purple': '#c49cff',
        'trace-red': '#f85149',
        // Evidence Atlas / Greenhouse
        'greenhouse-bg': '#0a0f0d',
        'greenhouse-soil': '#1a1510',
        'organism-cyan': '#0ff5e8',
        'organism-amber': '#fbbf24',
        'organism-violet': '#a78bfa',
        'organism-green': '#34d399',
        'scar-gold': '#d4a04a',
        'brass': '#b8860b',
        'brass-light': '#daa520',
        // Case File / Bench
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
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        hand: ['Georgia', 'serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up': 'fade-up 0.2s ease-out',
        'blink': 'blink 1s step-end infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'drift-up': 'driftUp 12s linear infinite',
        'grow-filament': 'growFilament 1.5s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
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
        breathe: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        driftUp: {
          '0%': { transform: 'translateY(100vh) translateX(0px)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-20px) translateX(20px)', opacity: '0' },
        },
        growFilament: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'brightness(1) drop-shadow(0 0 2px currentColor)' },
          '50%': { filter: 'brightness(1.3) drop-shadow(0 0 8px currentColor)' },
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
