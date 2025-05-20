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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <Navigation />
        <main className="container mx-auto py-10 px-4 sm:px-6 flex-grow">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-semibold mb-2">NextBlog</h3>
                <p className="text-gray-400">Sharing thoughts and ideas since 2025</p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition">GitHub</a>
                <a href="#" className="text-gray-400 hover:text-white transition">LinkedIn</a>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center md:text-left text-gray-400">
              <p>© 2025 NextBlog. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
