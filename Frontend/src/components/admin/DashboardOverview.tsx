import React from "react";
import { Users, FileText, TrendingUp, DollarSign, Activity, Clock } from "lucide-react";

const DashboardOverview: React.FC = () => {
  const stats = [
    { label: "Total Users", value: "1,284", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Issues Published", value: "48", icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Total Revenue", value: "LKR 642,000", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Active Readers", value: "856", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  const recentActivities = [
    { user: "Samantha Perera", action: "Purchased March Issue", time: "2 mins ago" },
    { user: "Admin", action: "Deleted May 2024 Draft", time: "15 mins ago" },
    { user: "Rajith Kumara", action: "New user registration", time: "1 hour ago" },
    { user: "Admin", action: "Updated Issue Pricing", time: "3 hours ago" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-left">
        <h1 className="text-3xl font-serif font-semibold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time insights into Thai Nilam's digital performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <Activity className="w-4 h-4 text-gray-300" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Recent Activity</h3>
            <button className="text-xs font-bold text-[#d4a017] hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivities.map((activity, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400 text-xs">
                    {activity.user[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{activity.user}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.action}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-[#0F172A] rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-serif font-bold mb-4">Pro Tip</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">
              "Regularly updating cover images can increase click-through rates by up to 25% for older issues."
            </p>
            <button className="px-6 py-2.5 bg-[#d4a017] text-white rounded-lg text-xs font-bold tracking-wide hover:bg-amber-600 transition-colors">
              Read More Tips
            </button>
          </div>
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
