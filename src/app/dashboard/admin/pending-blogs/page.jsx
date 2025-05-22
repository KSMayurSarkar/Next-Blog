'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle, XCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function PendingBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectionReasons, setRejectionReasons] = useState({});
  const [expandedBlogs, setExpandedBlogs] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to continue');
      router.push('/login');
      return;
    }
    fetchPendingBlogs(token);
  }, [router]);

  const fetchPendingBlogs = async (token) => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/blogs/pending', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setBlogs(data);
      } else {
        toast.error(data.message || 'Failed to fetch pending blogs');
      }
    } catch (error) {
      toast.error('Server error');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/approve/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success('Blog approved successfully');
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } else {
        const data = await res.json();
        toast.error(data.message || 'Blog approval failed');
      }
    } catch {
      toast.error('Server connection error');
    }
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem('token');
  const reason = rejectionReasons[id]?.trim();

  if (!reason) {
    toast.error('Please provide a rejection reason.');
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/blogs/reject/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reason }),
    });

    if (res.ok) {
      toast.success('Blog rejected successfully');
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } else {
      const data = await res.json();
      toast.error(data.message || 'Blog rejection failed');
    }
  } catch {
    toast.error('Server connection error');
  }
  };

  const toggleExpand = (id) => {
    setExpandedBlogs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="max-w-5xl mx-auto my-12 px-4">
      <div className="mb-8">
        <Link href="/dashboard/admin" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>Back to Dashboard</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Pending Blogs Review</h2>
          <p className="text-blue-100 mt-1">Approve or reject submitted blog posts</p>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              <span className="ml-2 text-gray-600">Loading pending blogs...</span>
            </div>
          ) : blogs.length === 0 ? (
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-4 text-gray-600">No pending blogs to review at the moment.</p>
              <p className="text-sm text-gray-500">New submissions will appear here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {blogs.map((blog) => (
                <div key={blog.id} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md">
                  <div className="bg-gray-50 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          By: <span className="font-medium">{blog.author_name || blog.author_id}</span> • Submitted: {new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <button 
                        onClick={() => toggleExpand(blog.id)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label={expandedBlogs[blog.id] ? "Collapse blog content" : "Expand blog content"}
                      >
                        <ChevronDown className={`h-5 w-5 transition-transform ${expandedBlogs[blog.id] ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                  
                  <div className={`transition-all duration-300 overflow-hidden ${expandedBlogs[blog.id] ? 'max-h-[1000px]' : 'max-h-24'}`}>
                    <div className="p-4 border-t border-gray-100">
                      <p className="text-gray-700 line-clamp-3">
                        {blog.content}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 border-t border-gray-200">
                    <div className="space-y-3">
                      <textarea
                        placeholder="Provide a reason if rejecting this blog (optional)"
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring focus:ring-blue-200 focus:border-blue-400 transition-colors"
                        value={rejectionReasons[blog.id] || ''}
                        onChange={(e) =>
                          setRejectionReasons((prev) => ({ ...prev, [blog.id]: e.target.value }))
                        }
                        rows="2"
                      />
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleApprove(blog.id)}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(blog.id)}
                          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}