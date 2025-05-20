import { blogPosts } from '../../lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function BlogPost({ params }) {
  const id = await params?.id;
  const post = blogPosts.find(post => post.id === id);
  
  if (!post) {
    notFound();
  }
  
  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-10">
        <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>Back to Blog</span>
        </Link>
      </div>
      
      
      <header className="mb-12">
        <div className="h-48 relative mb-8">
          <Image
            src="/images/sample1.jpg"
            alt={post.title}
            fill
            className="object-cover rounded-t-xl"
          />
        </div>
        
        <p className="text-sm font-medium text-blue-600 mb-3">{post.date}</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">{post.title}</h1>
        
        
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
            A
          </div>
          <div className="ml-4">
            <p className="font-medium text-gray-900">Author Name</p>
            <p className="text-sm text-gray-600">Blog Author</p>
          </div>
        </div>
      </header>
      
      
      <div className="prose prose-lg max-w-none mb-12">
        {post.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p>
        ))}
      </div>
      
      
      <div className="mb-12">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Next.js</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Web Development</span>
        </div>
      </div>
      
      
      <div className="border-t border-gray-200 my-12"></div>
      
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Comments</h2>
        <p className="text-gray-600">Comments section coming soon...</p>
        
        
      </section>
      
      
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.slice(0, 2).map((relatedPost) => (
            relatedPost.id !== post.id && (
              <div key={relatedPost.id} className="border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                <p className="text-sm font-medium text-blue-600 mb-2">{relatedPost.date}</p>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{relatedPost.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                <Link 
                  href={`/blog/${relatedPost.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold group"
                >
                  <span>Read Post</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            )
          ))}
        </div>
      </section>
    </article>
  );
}