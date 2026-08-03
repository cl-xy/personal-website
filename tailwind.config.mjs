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
        paper: '#FDFBF7',
        ink: '#1C1C1C',
        incident: '#D47A2A',
        'incident-bg': '#FFF8F0',
        fix: '#4A9B8E',
        'fix-bg': '#F0FAF7',
        muted: '#6B7280',
        border: '#E5E2DD',
        'border-strong': '#C8C4BD',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.05', fontWeight: '700' }],
        'hero-sm': ['2.5rem', { lineHeight: '1.1', fontWeight: '700' }],
      },
      maxWidth: {
        'prose': '62ch',
      },
    },
  },
  plugins: [],
};
