import './globals.css';

export const metadata = {
  title: 'Xinyi Lu — Case File',
  description: 'AI Engineer. Review the evidence.',
  openGraph: {
    title: 'Xinyi Lu — Case File',
    description: 'AI Engineer. Review the evidence.',
    type: 'website',
  },
  twitter: { card: 'summary' },
  icons: { icon: '/favicon.svg' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a1612',
};

export default function BenchLayout({ children }) {
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
      <body className="bg-bench-bg text-bench-cream min-h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
