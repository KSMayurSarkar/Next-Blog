'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogPost({ params }) {
  const { id } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          router.push('/not-found');
          return;
        }

        const data = await res.json();
        setPost(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
        router.push('/not-found');
      }
    };

    fetchBlog();
  }, [id, router]);

  if (loading || !post) return <div className="p-4">Loading...</div>;

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-10">
        <button onClick={() => router.back()} className="text-blue-600 hover:text-blue-800 font-medium">
          ← Back to Blog
        </button>
      </div>

      <header className="mb-10">
        <p className="text-sm text-blue-600 mb-2">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div className="text-gray-600 text-sm">Author ID: {post.author_id}</div>
      </header>

      <section className="prose prose-lg text-gray-800 mb-10">
        {post.content.split('\n\n').map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </section>

      {post.tags?.length > 0 && (
        <div className="mb-10">
          <h3 className="font-semibold text-gray-800 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
