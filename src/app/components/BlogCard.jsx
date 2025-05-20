import Link from 'next/link';
import Image from 'next/image';

export default function BlogCard({ post }) {
  return (
    <div className="bg-white border-0 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 relative">
        <Image
            src="/images/sample1.jpg"
            alt={post.title}
            fill
            className="object-cover rounded-t-xl"
        />
        </div>
      <div className="p-6">
        <p className="text-sm font-medium text-blue-600 mb-2">{post.date}</p>
        <h2 className="text-xl font-bold mb-3 text-gray-800">{post.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <Link 
          href={`/blog/${post.id}`}
          aria-label={`Read more about ${post.title}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold group"
        >
          <span>Read More</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
}