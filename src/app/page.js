import Link from 'next/link';
import { blogPosts } from './lib/data';

export default function Home() {

  const latestPosts = blogPosts.slice(0, 3);
  
  return (
    <div>
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">Welcome to My Blog</h1>
        <p className="text-xl">
          This is a simple blog built with Next.js App Router. Check out the latest posts below.
        </p>
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Posts</h2>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <div key={post.id} className="border rounded-lg p-6 shadow">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-500 mb-2">{post.date}</p>
              <p className="mb-4">{post.excerpt}</p>
              <Link 
                href={`/blog/${post.id}`}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}