import './globals.css';

export const metadata = {
  title: 'xinyi_lu — agent trace',
  description: 'AI Engineer portfolio. The page is the trace.',
  openGraph: {
    title: 'xinyi_lu — agent trace',
    description: 'AI Engineer portfolio rendered as a live agent trace.',
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

export default function TraceLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-trace-bg text-trace-text min-h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
