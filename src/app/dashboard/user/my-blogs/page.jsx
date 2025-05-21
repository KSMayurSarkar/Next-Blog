'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchBlogs(token);
  }, [router]);

  const fetchBlogs = async (token) => {
    try {
      const res = await fetch('http://localhost:5000/api/blogs/user-blogs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setBlogs(data);
      } else {
        toast.error(data.message || 'Failed to fetch blogs');
      }
    } catch (error) {
      toast.error('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">My Blogs</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li key={blog.id} className="border p-4 rounded">
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{new Date(blog.created_at).toLocaleDateString()}</p>
              <span
                className={`inline-block px-2 py-1 text-xs rounded font-medium ${
                  blog.status === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : blog.status === 'rejected'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {blog.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
