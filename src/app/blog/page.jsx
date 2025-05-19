import { blogPosts } from '../lib/data';
import BlogCard from '../components/BlogCard';

export default function BlogListing() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <div className="space-y-6">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}