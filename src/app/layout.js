import "./globals.css";
import Navbar from "@/components/navbar";
import { Providers } from './providers';

export const metadata = {
  title: "Xinyi Lu",
  description: "Xinyi Lu &apos; Personal Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}