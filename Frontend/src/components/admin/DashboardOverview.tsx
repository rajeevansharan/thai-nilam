import React from "react";
import { Users, FileText, TrendingUp, DollarSign, Clock, Calendar, Activity } from "lucide-react";

const DashboardOverview: React.FC = () => {
  const stats = [
    { label: "Total Users", value: "1,284", icon: Users, color: "text-blue-600", bg: "bg-blue-50", trend: "+8.2%" },
    { label: "Issues Published", value: "48", icon: FileText, color: "text-amber-600", bg: "bg-amber-50", trend: "0%" },
    { label: "Total Revenue", value: "LKR 642,000", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50", trend: "+12.5%" },
    { label: "Active Readers", value: "856", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50", trend: "+4.1%" },
  ];

  const recentActivities = [
    { user: "Samantha Perera", action: "Purchased March Issue", time: "2 mins ago" },
    { user: "Admin", action: "Deleted May 2024 Draft", time: "15 mins ago" },
    { user: "Rajith Kumara", action: "New user registration", time: "1 hour ago" },
    { user: "Admin", action: "Updated Issue Pricing", time: "3 hours ago" },
  ];

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#0F172A] mb-1 md:mb-2">Admin Dashboard</h1>
          <p className="text-xs md:text-sm text-gray-500 font-medium">Real-time overview of your publication's performance.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm w-fit">
          <Calendar className="w-4 h-4 text-[#d4a017]" />
          <span className="text-[10px] md:text-xs font-bold text-[#0F172A] uppercase tracking-widest">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-lg ${stat.trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-500'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">{stat.label}</p>
            <h3 className="text-xl md:text-2xl font-bold text-[#0F172A]">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Recent Activity List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 md:p-6 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white z-10">
            <h3 className="text-sm md:text-base font-bold text-[#0F172A] uppercase tracking-widest">Recent Activity</h3>
            <Activity className="w-4 h-4 text-[#d4a017]" />
          </div>
          <div className="divide-y divide-gray-50 overflow-y-auto max-h-[400px]">
            {recentActivities.map((activity, i) => (
              <div key={i} className="p-5 md:p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400 text-xs">
                    {activity.user[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1e293b]">{activity.user}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.action}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400 whitespace-nowrap">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-[#0F172A] rounded-2xl p-8 text-white relative overflow-hidden flex flex-col justify-center">
          <div className="relative z-10">
            <h3 className="text-xl font-serif font-bold mb-4">Pro Tip</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 italic">
              "Regularly updating cover images can increase click-through rates by up to 25% for older issues."
            </p>
            <button className="w-full py-4 bg-[#d4a017] text-white rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/10">
              Read Publishing Tips
            </button>
          </div>
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10px] left-[-10px] w-20 h-20 bg-[#d4a017]/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
