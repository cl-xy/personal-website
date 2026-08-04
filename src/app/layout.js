import './globals.css';

export const metadata = {
  title: 'Xinyi Lu — Evidence Atlas',
  description: 'AI Engineer portfolio. Explore the evidence.',
  openGraph: {
    title: 'Xinyi Lu — Evidence Atlas',
    description: 'AI Engineer building production LLM agents. Explore the trail.',
    type: 'website',
  },
  twitter: { card: 'summary' },
  icons: { icon: '/favicon.svg' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAF6F0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-atlas-bg text-atlas-slate min-h-screen">
        {children}
      </body>
    </html>
  );
}
