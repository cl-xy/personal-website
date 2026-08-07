import { Inter, Crimson_Pro } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-inter',
});

const crimson = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-serif',
});

export const metadata = {
  title: 'Xinyi Lu',
  description: 'AI/ML platform engineer. Cornell Tech MEng 2025. Previously Citi, Singapore.',
  metadataBase: new URL('https://cl-xy.github.io/personal-website'),
  openGraph: {
    title: 'Xinyi Lu',
    description: 'I build AI systems that ship. Cornell Tech MEng, previously Citi AI/ML Platform.',
    url: 'https://cl-xy.github.io/personal-website/',
    siteName: 'Xinyi Lu',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Xinyi Lu',
    description: 'I build AI systems that ship. Cornell Tech MEng, previously Citi AI/ML Platform.',
  },
  alternates: {
    canonical: 'https://cl-xy.github.io/personal-website/',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f7f5f0',
};

export default function FourRoomsLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${crimson.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
