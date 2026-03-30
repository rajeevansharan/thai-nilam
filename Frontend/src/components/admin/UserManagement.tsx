import React from "react";
import { Search, Filter, Settings, Trash2 } from "lucide-react";

const UserManagement: React.FC = () => {
  const users = [
    {
      id: 1,
      name: "Alex Morgan",
      email: "alex.m@example.com",
      role: "Premium Subscriber",
      lastActive: "2 hours ago",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "schen.dev@example.com",
      role: "Basic Member",
      lastActive: "5 days ago",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Michael Ross",
      email: "mross@legal.com",
      role: "Premium Subscriber",
      lastActive: "Just now",
      status: "Active",
    },
    {
      id: 4,
      name: "Elena Gilbert",
      email: "elena.g@mystic.com",
      role: "Admin",
      lastActive: "10 mins ago",
      status: "Active",
    },
  ];

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
                Plan / Role
              </th>
              <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                Last Activity
              </th>
              <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                Status
              </th>
              <th className="px-8 py-5 text-right text-[10px] uppercase font-bold tracking-widest text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50/30 transition-colors group"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs ring-2 ring-white">
                      {user.name.charAt(0)}
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
                  {user.role}
                </td>
                <td className="px-8 py-6 text-sm text-gray-400">
                  {user.lastActive}
                </td>
                <td className="px-8 py-6">
                  <span
                    className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full ${user.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-900 transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-6 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-widest">
          <span>Showing 4 of 1,280 users</span>
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
    </div>
  );
};

export default UserManagement;
