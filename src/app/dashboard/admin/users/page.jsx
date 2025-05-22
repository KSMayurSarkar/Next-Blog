'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/auth/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to fetch users');

      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      toast.error('Failed to load users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5000/api/auth/toggle-status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to update status');
      }

      toast.success(result.message);
      fetchUsers();
    } catch (error) {
      toast.error('Error toggling status');
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      toast.error('Access denied');
      router.push('/login');
    } else {
      fetchUsers();
    }
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Users</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(user.id, user.isActive)}
                        className={`px-4 py-2 rounded text-white text-sm transition-colors ${
                          user.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
