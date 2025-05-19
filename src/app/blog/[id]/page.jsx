import { blogPosts } from '../../lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function BlogPost({ params }) {
  const id = await params.id;
  const post = blogPosts.find(post => post.id === id);
  
  if (!post) {
    notFound();
  }
  
  return (
    <article>
      <div className="mb-8">
        <Link href="/blog" className="text-blue-600 hover:text-blue-800">
          ← Back to Blog
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-8">{post.date}</p>
      
      <div className="prose lg:prose-xl max-w-none">
        <p>{post.content}</p>
      </div>
    </article>
  );
}