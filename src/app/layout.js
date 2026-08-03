import './globals.css';
import { ConsoleEasterEgg } from './console-easter-egg';

export const metadata = {
  title: 'Xinyi Lu — AI Engineer',
  description: 'I ship AI systems, then publish what broke.',
  openGraph: {
    title: 'Xinyi Lu — AI Engineer',
    description: 'I ship AI systems, then publish what broke.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FDFBF7',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-paper text-ink min-h-screen">
        <ConsoleEasterEgg />
        {children}
      </body>
    </html>
  );
}
