import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminSidebar from "../components/admin/AdminSidebar";
import IssueManagement from "../components/admin/IssueManagement";
import UserManagement from "../components/admin/UserManagement";

interface AdminProps {
  onNavigate?: (page: string) => void;
}

const Admin: React.FC<AdminProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("issues");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activePage="admin" onNavigate={onNavigate} />

      <div className="flex-grow flex">
        {/* Sidebar Navigation */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="flex-grow p-8 lg:p-12">
          {activeTab === "issues" && <IssueManagement />}
          {activeTab === "users" && <UserManagement />}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
