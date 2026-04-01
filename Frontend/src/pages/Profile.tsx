import React from 'react';
import { User, Settings, CreditCard, Bookmark, LogOut, ChevronRight, Mail, Calendar, BookOpen } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface ProfileProps {
  onNavigate?: (page: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header activePage="profile" onNavigate={onNavigate} />
      
      <main className="max-w-5xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Sidebar / User Info */}
          <div className="lg:col-span-1 border-r border-gray-50 pr-8">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-6 ring-4 ring-gray-50 overflow-hidden">
                <User className="w-16 h-16 text-gray-300" strokeWidth={1} />
              </div>
              <h1 className="text-3xl font-serif font-semibold text-gray-900 mb-2">Alex Morgan</h1>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-8">Premium Subscriber</p>
              
              <div className="w-full space-y-2">
                <button className="flex items-center justify-between w-full px-4 py-3 bg-gray-900 text-white rounded shadow-sm text-sm font-medium">
                  <span className="flex items-center gap-3">
                    <User className="w-4 h-4 opacity-70" /> Account Details
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
                <button className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 text-gray-600 rounded text-sm font-medium transition-colors">
                  <span className="flex items-center gap-3">
                    <Bookmark className="w-4 h-4 opacity-70" /> Saved Collections
                  </span>
                </button>
                <button className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 text-gray-600 rounded text-sm font-medium transition-colors">
                  <span className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 opacity-70" /> Billing & Payment
                  </span>
                </button>
                <button className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 text-gray-600 rounded text-sm font-medium transition-colors">
                  <span className="flex items-center gap-3">
                    <Settings className="w-4 h-4 opacity-70" /> Preferences
                  </span>
                </button>
                <div className="pt-8 border-t border-gray-50 mt-8">
                  <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded text-sm font-medium transition-colors">
                    <LogOut className="w-4 h-4 opacity-70" /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Membership Header */}
            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="text-left">
                  <h2 className="text-xl font-serif font-semibold text-[#8b6b3e] mb-2">Thai Nilam Premium</h2>
                  <p className="text-sm text-[#a38b68] max-w-sm leading-relaxed">
                    You have full access to our entire library and future Thai Nilam releases every month.
                  </p>
                </div>
                <div className="text-left md:text-right">
                   <p className="text-[10px] uppercase font-bold tracking-widest text-amber-600 mb-1">Next Renewal</p>
                   <p className="text-lg font-serif font-medium text-gray-900 leading-none mb-1">April 12, 2026</p>
                   <p className="text-xs text-gray-400">Monthly Plan · $4.99</p>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm text-left">
                  <BookOpen className="w-5 h-5 text-amber-500 mb-4" />
                  <p className="text-2xl font-serif font-medium text-gray-900 leading-none">24</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-2">Issues Owned</p>
               </div>
               <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm text-left">
                  <Calendar className="w-5 h-5 text-indigo-500 mb-4" />
                  <p className="text-2xl font-serif font-medium text-gray-900 leading-none">2.5</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-2">Years Active</p>
               </div>
               <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm text-left">
                  <Mail className="w-5 h-5 text-emerald-500 mb-4" />
                  <p className="text-2xl font-serif font-medium text-gray-900 leading-none">12</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-2">Newsletters</p>
               </div>
            </div>

            {/* Personal Info Feed */}
            <section className="text-left">
               <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-gray-400 mb-6 pb-2 border-b border-gray-50">Personal Information</h3>
               <div className="space-y-6">
                  <div className="grid grid-cols-3 py-2 border-b border-gray-50">
                    <span className="text-sm font-medium text-gray-400">Full Name</span>
                    <span className="text-sm text-gray-900 col-span-2">Alex Morgan</span>
                  </div>
                  <div className="grid grid-cols-3 py-2 border-b border-gray-50">
                    <span className="text-sm font-medium text-gray-400">Email Address</span>
                    <span className="text-sm text-gray-900 col-span-2">alex.morgan@example.com</span>
                  </div>
                  <div className="grid grid-cols-3 py-2 border-b border-gray-50">
                    <span className="text-sm font-medium text-gray-400">Shipping</span>
                    <span className="text-sm text-gray-900 col-span-2">New York, NY 10012, USA</span>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <span className="text-sm font-medium text-gray-400">Language</span>
                    <span className="text-sm text-gray-900 col-span-2">English (United States)</span>
                  </div>
               </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
