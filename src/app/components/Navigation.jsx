'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">NextBlog</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Blog
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              About
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-inner">
            <Link 
              href="/"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/blog"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium"
            >
              Blog
            </Link>
            <Link 
              href="/about"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}