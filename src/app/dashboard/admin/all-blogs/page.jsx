'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Loader2, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminAllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'approved', 'pending', 'rejected'
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      toast.error('Access denied. Admin privileges required.');
      router.push('/login');
      return;
    }

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/blogs/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setBlogs(data);
        } else {
          toast.error(data.message || 'Failed to load blogs');
        }
      } catch (err) {
        toast.error('Server error while fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [router]);

  // Filter blogs based on search term and status filter
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (blog.author?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && blog.status.toLowerCase() === filter;
  });

  const getBadgeClass = (status) => {
    switch(status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
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
          <h1 className="text-2xl font-bold text-white">All Blogs</h1>
          <p className="text-blue-100 mt-1">Complete overview of all blog posts</p>
        </div>
        
        <div className="p-6">
          {/* Search and filter controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search blogs by title, content or author..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-200 focus:border-blue-400 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-300 px-3">
              <Filter className="h-4 w-4 text-gray-500 mr-2" />
              <select
                className="bg-transparent py-2 flex-grow focus:outline-none text-gray-700"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              <span className="ml-2 text-gray-600">Loading blogs...</span>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-4 text-gray-600">No blogs found matching your search criteria.</p>
              <p className="text-sm text-gray-500">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBlogs.map((blog) => (
                <div key={blog.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">{blog.title}</h2>
                        <p className="text-sm text-gray-600 mb-2">
                          By {blog.author?.name || 'Unknown'} • {new Date(blog.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeClass(blog.status)}`}>
                        {blog.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 line-clamp-3 mb-4">{blog.content.slice(0, 150)}...</p>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <Link 
                        href={`/blog/${blog.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Blog
                      </Link>
                      
                      <div className="flex space-x-2">
                        <button 
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                          aria-label="Edit blog"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-gray-500 hover:text-red-600 transition-colors"
                          aria-label="Delete blog"
                        >
                          <Trash2 className="h-4 w-4" />
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