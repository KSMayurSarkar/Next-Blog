'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  Edit, 
  BookOpen, 
  Settings, 
  LogOut,
  PlusCircle,
  Clock,
  User,
  BookMarked,
  Home
} from 'lucide-react';

export default function UserDashboard() {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    draftBlogs: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'user') {
      toast.error('Access denied');
      router.push('/login');
      return;
    } else {
      setRole('user');
    }
    
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalBlogs: 5,
        draftBlogs: 2
      });
      setLoading(false);
    }, 800);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  if (role !== 'user') return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-md">
          <div className="p-6 flex items-center border-b border-gray-100">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              B
            </div>
            <h1 className="text-xl font-bold ml-3 text-gray-800">Blog Portal</h1>
          </div>
          
          <nav className="mt-6">
            <div className="px-4 py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Main</p>
            </div>
            
            <Link href="/dashboard/user" className="flex items-center px-6 py-3 text-gray-700 bg-indigo-50 border-r-4 border-indigo-600">
              <Home className="h-5 w-5 text-indigo-600" />
              <span className="mx-3 font-medium">Dashboard</span>
            </Link>
            
            <Link href="/dashboard/user/create" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors">
              <PlusCircle className="h-5 w-5" />
              <span className="mx-3">Create Blog</span>
            </Link>
            
            <Link href="/dashboard/user/my-blogs" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors">
              <BookMarked className="h-5 w-5" />
              <span className="mx-3">My Blogs</span>
            </Link>
            
            <div className="px-4 py-2 mt-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</p>
            </div>
            
            <Link href="/dashboard/user/profile" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors">
              <User className="h-5 w-5" />
              <span className="mx-3">Profile</span>
            </Link>
            
            <Link href="/dashboard/user/settings" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors">
              <Settings className="h-5 w-5" />
              <span className="mx-3">Settings</span>
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
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <Link 
              href="/dashboard/user/create" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg inline-flex items-center transition-colors"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Blog Post
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Blogs</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalBlogs}</p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <BookOpen className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-amber-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Draft Blogs</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stats.draftBlogs}</p>
                  </div>
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/dashboard/user/create" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all group">
                  <div className="bg-indigo-100 p-3 rounded-lg group-hover:bg-indigo-200">
                    <PlusCircle className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800">Create New Blog</h3>
                    <p className="text-sm text-gray-500 mt-1">Write a new blog post</p>
                  </div>
                </Link>
                
                <Link href="/dashboard/user/my-blogs" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group">
                  <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200">
                    <BookMarked className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800">View My Blogs</h3>
                    <p className="text-sm text-gray-500 mt-1">Manage your existing posts</p>
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