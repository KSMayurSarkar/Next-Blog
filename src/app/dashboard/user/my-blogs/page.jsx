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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block">My Blog Posts</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 text-blue-600">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading your blogs...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block">My Blog Posts</h1>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
      </div>
      
      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs yet</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first blog post.</p>
          <button
            onClick={() => router.push('/create-blog')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Your First Blog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white border-0 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 relative bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-blue-600">
                    {new Date(blog.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      blog.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : blog.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${
                      blog.status === 'approved'
                        ? 'bg-green-400'
                        : blog.status === 'rejected'
                        ? 'bg-red-400'
                        : 'bg-yellow-400'
                    }`}></span>
                    {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">{blog.title}</h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
                
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                      >
                        <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Rejection Reason */}
                {blog.status === 'rejected' && blog.rejection_reason && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start">
                      <svg className="flex-shrink-0 h-4 w-4 text-red-400 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-red-800">Rejection Reason:</p>
                        <p className="text-sm text-red-700 mt-1">{blog.rejection_reason}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => router.push(`/blog/edit/${blog.id}`)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold group"
                  >
                    <span>Edit</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  
                  {blog.status === 'approved' && (
                    <button
                      onClick={() => router.push(`/blog/${blog.id}`)}
                      className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold group"
                    >
                      <span>View</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                  
                  <div className="text-xs text-gray-500">
                    ID: {blog.id}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}