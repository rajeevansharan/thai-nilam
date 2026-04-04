import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import Footer from "../components/Footer";
import AdminSidebar from "../components/admin/AdminSidebar";
import IssueManagement from "../components/admin/IssueManagement";
import UserManagement from "../components/admin/UserManagement";
import DashboardOverview from "../components/admin/DashboardOverview";

interface AdminProps {
  onNavigate?: (page: string) => void;
}

const Admin: React.FC<AdminProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader onNavigate={onNavigate} />

      <div className="flex-grow flex overflow-hidden">
        {/* Sidebar Navigation */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="flex-grow p-8 lg:p-12 overflow-y-auto">
          {activeTab === "dashboard" && <DashboardOverview />}
          {activeTab === "issues" && <IssueManagement />}
          {activeTab === "users" && <UserManagement />}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
