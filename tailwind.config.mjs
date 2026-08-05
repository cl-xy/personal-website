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
        'greenhouse-bg': '#0a0f0d',
        'greenhouse-soil': '#1a1510',
        'organism-cyan': '#0ff5e8',
        'organism-amber': '#fbbf24',
        'organism-violet': '#a78bfa',
        'organism-green': '#34d399',
        'scar-gold': '#d4a04a',
        'brass': '#b8860b',
        'brass-light': '#daa520',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'drift-up': 'driftUp 12s linear infinite',
        'grow-filament': 'growFilament 1.5s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
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
    },
  },
  plugins: [],
};
