import { blogPosts } from '../lib/data';
import BlogCard from '../components/BlogCard';

export default function BlogListing() {
  return (
    <div>
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block">All Blog Posts</h1>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}