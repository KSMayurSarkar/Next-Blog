import Link from 'next/link';

export default function BlogCard({ post }) {
  return (
    <div className="border rounded-lg p-6 mb-4 shadow hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-500 mb-2">{post.date}</p>
      <p className="mb-4">{post.excerpt}</p>
      <Link 
        href={`/blog/${post.id}`}
        className="text-blue-600 hover:text-blue-800 font-semibold"
      >
        Read More →
      </Link>
    </div>
  );
}