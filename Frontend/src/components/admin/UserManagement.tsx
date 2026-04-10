import React, { useState, useEffect } from "react";
import { Search, Filter, Settings, Trash2, Users } from "lucide-react";
import { getAllUsers, deleteUser, updateUser, type User } from "../../services/userService";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
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
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#0F172A]">User Management</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">Manage user accounts, roles and access permissions.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm w-fit">
          <Users className="w-4 h-4 text-[#d4a017]" />
          <span className="text-[10px] md:text-xs font-bold text-[#0F172A] uppercase tracking-widest">{users.length} Total Users</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#d4a017] transition-all"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-all font-bold text-[10px] uppercase tracking-widest text-[#1e293b]">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="bg-white rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">User Details</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Type</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Plan</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <p className="text-gray-400 text-sm font-medium">Loading user collection...</p>
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-extrabold text-[#d4a017] text-xs shrink-0 ring-2 ring-white">
                          {user.name?.[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1e293b]">{user.name}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${user.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-500'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${user.isPremium ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400'}`}>
                        {user.isPremium ? 'Premium Subscriber' : 'Basic Member'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(user)} className="p-2 text-gray-400 hover:text-[#d4a017] hover:bg-amber-50 rounded-lg transition-all">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <p className="text-gray-400 text-sm italic">No users matching your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingUser(null)} />
          <div className="relative bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 md:p-8 border-b border-gray-50">
              <h3 className="text-xl font-serif font-bold text-[#0F172A]">Edit Privileges</h3>
              <p className="text-xs text-gray-500 mt-1 font-medium">Updating {editingUser.name}</p>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">System Role</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none transition-all"
                >
                  <option value="USER">Standard User</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Subscription Status</label>
                <select
                  value={editPremium ? "yes" : "no"}
                  onChange={(e) => setEditPremium(e.target.value === "yes")}
                  className="w-full bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none transition-all"
                >
                  <option value="no">Basic Membership</option>
                  <option value="yes">Premium Subscription</option>
                </select>
              </div>
            </div>
            <div className="p-6 md:p-8 bg-gray-50/50 flex flex-col sm:flex-row gap-3">
              <button onClick={() => setEditingUser(null)} className="flex-1 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-widest hover:bg-gray-100 rounded-xl transition-all order-2 sm:order-1">Cancel</button>
              <button onClick={saveUserUpdates} className="flex-1 py-3.5 text-xs font-bold bg-[#0F172A] text-white uppercase tracking-widest rounded-xl shadow-lg hover:bg-black transition-all order-1 sm:order-2">Update User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
