import React, { useState, useEffect } from "react";
import { Search, Filter, Settings, Trash2 } from "lucide-react";
import { getAllUsers, deleteUser, updateUser, type User } from "../../services/userService";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editRole, setEditRole] = useState<string>("USER");
  const [editPremium, setEditPremium] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Failed to delete user", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditRole(user.role.toUpperCase() === "ADMIN" ? "ADMIN" : "USER");
    setEditPremium(user.isPremium);
  };

  const saveUserUpdates = async () => {
    if (!editingUser) return;
    try {
      const updated = await updateUser(editingUser.id, { role: editRole, isPremium: editPremium });
      setUsers(users.map((u) => (u.id === editingUser.id ? updated : u)));
      setEditingUser(null);
    } catch (error) {
      console.error("Failed to update user details", error);
      alert("Failed to update user details. Please try again.");
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-6">
        <div className="text-left w-full lg:w-auto">
          <h1 className="text-3xl font-serif font-semibold text-gray-900">
            User Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Search, manage roles, and review account activity.
          </p>
        </div>
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative grow lg:grow-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full lg:w-64 bg-white border border-gray-100 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all font-medium"
            />
          </div>
          <button className="p-3.5 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors text-gray-500">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                User
              </th>
              <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                Role
              </th>
              <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                Plan
              </th>
              <th className="px-8 py-5 text-right text-[10px] uppercase font-bold tracking-widest text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center text-sm text-gray-400 font-medium">
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center text-sm text-gray-400 font-medium">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50/30 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs ring-2 ring-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-gray-600">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-gray-600">
                    {user.isPremium ? "Premium Subscriber" : "Basic Member"}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEditModal(user)}
                        title="Update Role and Plan"
                        className="p-2 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete User"
                        className="p-2 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="p-6 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-widest">
          <span>Showing {users.length} users</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 hover:bg-gray-50 rounded border border-gray-100">
              Prev
            </button>
            <button className="px-4 py-2 hover:bg-gray-50 rounded border border-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
      
      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-50">
              <h3 className="font-serif text-xl font-bold text-gray-900">Edit User Details</h3>
              <p className="text-sm text-gray-500 mt-1">Updating {editingUser.name}'s account</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  User Role
                </label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition-all"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Subscription Plan
                </label>
                <select
                  value={editPremium ? "yes" : "no"}
                  onChange={(e) => setEditPremium(e.target.value === "yes")}
                  className="w-full bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition-all"
                >
                  <option value="no">Basic Member</option>
                  <option value="yes">Premium Subscriber</option>
                </select>
              </div>
            </div>
            <div className="p-6 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setEditingUser(null)}
                className="px-6 py-2.5 rounded-xl font-semibold text-sm text-gray-500 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveUserUpdates}
                className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-[#d4a017] text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
