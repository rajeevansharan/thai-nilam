import React from "react";
import { Users, FileUp, Settings, LayoutDashboard } from "lucide-react";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col p-6 space-y-2">
      <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-6 px-4">
        Management
      </div>

      <button
        onClick={() => setActiveTab("issues")}
        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === "issues" ? "bg-gray-900 text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"}`}
      >
        <FileUp className="w-4 h-4" /> Issue Management
      </button>

      <button
        onClick={() => setActiveTab("users")}
        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === "users" ? "bg-gray-900 text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"}`}
      >
        <Users className="w-4 h-4" /> User Management
      </button>

      <div className="pt-10 border-t border-gray-50 mt-10">
        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-4 px-4">
          System
        </div>
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-50">
          <Settings className="w-4 h-4" /> Global Settings
        </button>
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-50">
          <LayoutDashboard className="w-4 h-4" /> Analytics
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
