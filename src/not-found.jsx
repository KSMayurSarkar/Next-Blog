import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">Page not found</h2>
      <p className="mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Return Home
      </Link>
    </div>
  );
}