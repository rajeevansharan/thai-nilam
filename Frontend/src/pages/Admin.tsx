import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import Footer from "../components/Footer";
import AdminSidebar from "../components/admin/AdminSidebar";
import IssueManagement from "../components/admin/IssueManagement";
import UserManagement from "../components/admin/UserManagement";
import DashboardOverview from "../components/admin/DashboardOverview";
import PaymentManagement from "../components/admin/PaymentManagement";
import { LayoutDashboard, FileUp, Users, CreditCard } from "lucide-react";

interface AdminProps {
  onNavigate?: (page: string) => void;
}

const Admin: React.FC<AdminProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const mobileTabItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "issues", label: "Issues", icon: FileUp },
    { id: "users", label: "Users", icon: Users },
    { id: "payments", label: "Payments", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader onNavigate={onNavigate} />

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden flex overflow-x-auto border-b border-gray-100 bg-white px-2 gap-1 scrollbar-hide">
        {mobileTabItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
              activeTab === item.id
                ? "border-[#d4a017] text-[#0F172A]"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex-grow flex overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="flex-grow p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto">
          {activeTab === "dashboard" && <DashboardOverview />}
          {activeTab === "issues" && <IssueManagement />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "payments" && <PaymentManagement />}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
