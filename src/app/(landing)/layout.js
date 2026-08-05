import './globals.css';

export const metadata = {
  title: 'Xinyi Lu — Portfolio',
  description: 'AI Engineer. Multiple portfolio versions.',
  openGraph: {
    title: 'Xinyi Lu — Portfolio',
    description: 'AI Engineer building production LLM agents.',
    type: 'website',
  },
  twitter: { card: 'summary' },
  icons: { icon: '/favicon.svg' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0D1117',
};

export default function LandingLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a0e14] text-[#e2e8f0] min-h-screen">
        {children}
      </body>
    </html>
  );
}
