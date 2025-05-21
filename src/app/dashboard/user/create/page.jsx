'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CreateBlogPage() {
  const [formData, setFormData] = useState({ title: '', content: '', tags: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'user') {
      toast.error('Access denied');
      router.push('/login');
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to create a blog');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/blogs/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Blog submitted for approval!');
        router.push('/dashboard/user/my-blogs');
      } else {
        toast.error(data.message || 'Failed to create blog');
      }
    } catch (err) {
      toast.error('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="content"
          placeholder="Blog Content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={8}
          className="w-full border p-2 rounded"
        />
        <input
          name="tags"
          type="text"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Submitting...' : 'Publish'}
        </button>
      </form>
    </div>
  );
}
