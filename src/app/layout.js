import './globals.css';
import { ConsoleEasterEgg } from './console-easter-egg';

export const metadata = {
  title: 'Xinyi Lu — AI Engineer',
  description: 'I build agentic systems, then write down what broke.',
  openGraph: {
    title: 'Xinyi Lu — AI Engineer',
    description: 'I build agentic systems, then write down what broke.',
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
  themeColor: '#FAF7F2',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-canvas text-ink min-h-screen">
        <ConsoleEasterEgg />
        {children}
      </body>
    </html>
  );
}
