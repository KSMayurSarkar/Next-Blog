import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from './lib/data';

export default function Home() {

  const latestPosts = blogPosts.slice(0, 3);
  
  return (
    <div>
      <section className="mb-16 text-center md:text-left">
        <div className="max-w-3xl mx-auto md:mx-0">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Welcome to NextBlog</h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            This is a simple blog built with Next.js App Router. Check out the latest posts below for insights, tutorials, and thoughts.
          </p>
        </div>
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Latest Posts</h2>
          <Link href="/blog" className="flex items-center text-blue-600 hover:text-blue-800 font-medium group">
            <span>View All</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <div key={post.id} className="bg-white border-0 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
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
                <h3 className="text-xl font-bold mb-3 text-gray-800">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <Link 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold group"
                >
                  <span>Read More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}