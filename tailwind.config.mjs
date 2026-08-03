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
        canvas: '#FAF7F2',
        ink: '#1F2933',
        terracotta: '#C96F4A',
        sage: '#7A9E7E',
        saffron: '#F2CC8F',
        muted: '#8B8680',
        'code-bg': '#F5F0EA',
      },
      fontFamily: {
        heading: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'hero-sm': ['2.25rem', { lineHeight: '1.15', fontWeight: '700' }],
      },
      maxWidth: {
        'prose': '65ch',
      },
    },
  },
  plugins: [],
};
