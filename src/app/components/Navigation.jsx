import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          My Blog
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link href="/blog" className="text-white hover:text-gray-300">
            Blog
          </Link>
          <Link href="/about" className="text-white hover:text-gray-300">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}