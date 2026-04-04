import React from "react";
import AdminHeader from "../components/AdminHeader";
import Footer from "../components/Footer";
import { User, LogOut, LayoutDashboard, Mail, ShieldCheck } from "lucide-react";
import type { User as UserType } from "../types";

interface AdminProfileProps {
  onNavigate: (page: string) => void;
  user: UserType | null;
  onLogout: () => void;
}

const AdminProfile: React.FC<AdminProfileProps> = ({ onNavigate, user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader onNavigate={onNavigate} />

      <main className="flex-grow flex items-center justify-center p-8">
        <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
            {/* Header Section */}
            <div className="bg-[#0F172A] p-10 text-center relative overflow-hidden">
               {/* Pattern Overlay */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
               </div>
               
               <div className="relative z-10">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-white/10">
                    <User className="text-white w-12 h-12" />
                  </div>
                  <h1 className="text-white text-2xl font-serif font-bold">{user?.name || "Administrator"}</h1>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#d4a017] text-[10px] font-bold uppercase tracking-widest text-white rounded-full">
                    <ShieldCheck className="w-3 h-3" /> Admin Access
                  </div>
               </div>
            </div>

            {/* Details Section */}
            <div className="p-10 space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</p>
                    <p className="text-gray-900 font-semibold">{user?.email || "admin@thainilam.com"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-left">
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Current Role</p>
                    <p className="text-gray-900 font-semibold">{user?.role || "ADMIN"}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4 border-t border-gray-50">
                <button
                  onClick={() => onNavigate("admin")}
                  className="w-full py-4 bg-[#0F172A] text-white rounded-xl font-bold text-sm tracking-wide transition-all hover:bg-[#1E293B] shadow-lg shadow-gray-200 flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
                </button>
                
                <button
                  onClick={onLogout}
                  className="w-full py-4 text-red-500 font-bold text-sm tracking-wide hover:bg-red-50 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </div>
          
          <p className="mt-8 text-center text-gray-400 text-xs font-medium italic">
            "With great power comes great responsibility."
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminProfile;
