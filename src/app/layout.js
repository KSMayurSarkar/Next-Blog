import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from './components/Navigation';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'My Next.js Blog',
  description: 'A simple blog built with Next.js App Router',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <body>
        <Navigation />
        <main className="container mx-auto py-8 px-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-8 mt-8">
          <div className="container mx-auto text-center">
            <p>© 2025 My Blog. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
