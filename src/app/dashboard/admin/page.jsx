'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  ClipboardCheck, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  BarChart3,
  PlusCircle,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalBlogs: 0,
    pendingBlogs: 0,
    approvedBlogs: 0,
    rejectedBlogs: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      toast.error('Access denied. Admin privileges required.');
      router.push('/login');
      return;
    }

    // Simulate fetching dashboard stats
    // In a real application, you would fetch this data from your API
    const fetchStats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
    
        // Fetch all necessary data
        const [blogsRes, usersRes, totalBlogsRes] = await Promise.all([
          fetch('http://localhost:5000/api/blogs/pending', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/auth/', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/blogs/user-blogs/', {
            headers: { Authorization: `Bearer ${token}` }
          }),
        ]);
    
        if (!blogsRes.ok || !usersRes.ok) {
          throw new Error('Failed to fetch data');
        }
        console.log(usersRes);
        console.log(blogsRes);
        const pendingBlogs = await blogsRes.json(); 
        const usersData = await usersRes.json(); 
        const blogCount = await totalBlogsRes.json();
        console.log(usersData);
    
        
        setStats({
          totalBlogs: blogCount.length,           
          pendingBlogs: pendingBlogs.length,
          approvedBlogs: 32,        
          rejectedBlogs: 3,         
          totalUsers: usersData.users.length,
        });
    
      } catch (error) {
        toast.error('Failed to fetch dashboard statistics');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-md ">
          <div className="p-6 flex items-center border-b border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <h1 className="text-xl font-bold ml-3 text-gray-800">Admin Panel</h1>
          </div>
          
          <nav className="mt-6">
            <div className="px-4 py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Main</p>
            </div>
            
            <Link href="/dashboard/admin" className="flex items-center px-6 py-3 text-gray-700 bg-blue-50 border-r-4 border-blue-600">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span className="mx-3 font-medium">Dashboard</span>
            </Link>
            
            <Link href="/dashboard/admin/pending-blogs" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
              <ClipboardCheck className="h-5 w-5" />
              <span className="mx-3">Review Blogs</span>
            </Link>
            
            <Link href="/dashboard/admin/all-blogs" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
              <BookOpen className="h-5 w-5" />
              <span className="mx-3">All Blogs</span>
            </Link>
            
            <Link href="/dashboard/admin/users" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
              <Users className="h-5 w-5" />
              <span className="mx-3">Manage Users</span>
            </Link>
            
            <div className="px-4 py-2 mt-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Settings</p>
            </div>
            
            <Link href="/dashboard/admin/settings" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
              <Settings className="h-5 w-5" />
              <span className="mx-3">Site Settings</span>
            </Link>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="mx-3">Logout</span>
            </button>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="ml-6 flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <Link 
              href="/dashboard/admin/blog/new" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center transition-colors"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Blog Post
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Blogs</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalBlogs}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pending Review</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stats.pendingBlogs}</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Approved</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stats.approvedBlogs}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Rejected</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stats.rejectedBlogs}</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/dashboard/admin/pending-blogs" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-all group">
                  <div className="bg-yellow-100 p-3 rounded-lg group-hover:bg-yellow-200">
                    <ClipboardCheck className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800">Review Blogs</h3>
                    <p className="text-sm text-gray-500 mt-1">{stats.pendingBlogs} pending reviews</p>
                  </div>
                </Link>
                
                <Link href="/dashboard/admin/users" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group">
                  <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800">Users</h3>
                    <p className="text-sm text-gray-500 mt-1">{stats.totalUsers} registered users</p>
                  </div>
                </Link>
                
                <Link href="/dashboard/admin/blog/new" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group">
                  <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200">
                    <PlusCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800">New Blog</h3>
                    <p className="text-sm text-gray-500 mt-1">Create a new post</p>
                  </div>
                </Link>
                
                <Link href="/dashboard/admin/settings" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-gray-500 hover:bg-gray-50 transition-all group">
                  <div className="bg-gray-100 p-3 rounded-lg group-hover:bg-gray-200">
                    <Settings className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800">Settings</h3>
                    <p className="text-sm text-gray-500 mt-1">Configure site options</p>
                  </div>
                </Link>
              </div>
            </div>
            
            
          </div>
          
          
        </div>
      </div>
    </div>
  );
}