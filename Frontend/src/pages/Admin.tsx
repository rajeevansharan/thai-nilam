import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Users, 
  FileUp, 
  Plus, 
  Trash2, 
  Settings, 
  LayoutDashboard, 
  Search, 
  Filter, 
  ChevronRight, 
  Upload,
  Calendar
} from 'lucide-react';

interface AdminProps {
  onNavigate?: (page: string) => void;
}

const Admin: React.FC<AdminProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('issues');
  const [selectedMonth, setSelectedMonth] = useState('April');
  const [selectedYear, setSelectedYear] = useState('2026');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const years = ['2026', '2025', '2024'];

  const users = [
    { id: 1, name: 'Alex Morgan', email: 'alex.m@example.com', role: 'Premium Subscriber', lastActive: '2 hours ago', status: 'Active' },
    { id: 2, name: 'Sarah Chen', email: 'schen.dev@example.com', role: 'Basic Member', lastActive: '5 days ago', status: 'Inactive' },
    { id: 3, name: 'Michael Ross', email: 'mross@legal.com', role: 'Premium Subscriber', lastActive: 'Just now', status: 'Active' },
    { id: 4, name: 'Elena Gilbert', email: 'elena.g@mystic.com', role: 'Admin', lastActive: '10 mins ago', status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activePage="admin" onNavigate={onNavigate} />
      
      <div className="flex-grow flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col p-6 space-y-2">
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-6 px-4">Management</div>
          
          <button 
            onClick={() => setActiveTab('issues')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === 'issues' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <FileUp className="w-4 h-4" /> Issue Management
          </button>
          
          <button 
             onClick={() => setActiveTab('users')}
             className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === 'users' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Users className="w-4 h-4" /> User Management
          </button>

          <div className="pt-10 border-t border-gray-50 mt-10">
             <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-4 px-4">System</div>
             <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-50">
               <Settings className="w-4 h-4" /> Global Settings
             </button>
             <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-50">
               <LayoutDashboard className="w-4 h-4" /> Analytics
             </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-8 lg:p-12">
          {activeTab === 'issues' && (
            <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                <div className="text-left">
                  <h1 className="text-3xl font-serif font-semibold text-gray-900">Upload New Edition</h1>
                  <p className="text-sm text-gray-500 mt-1">Add monthly magazine issues and covers to the digital library.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 text-left">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Target Month</label>
                      <div className="relative group">
                         <select 
                           value={selectedMonth}
                           onChange={(e) => setSelectedMonth(e.target.value)}
                           className="w-full appearance-none bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition-all"
                         >
                           {months.map(m => <option key={m} value={m}>{m}</option>)}
                         </select>
                         <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2 text-left">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Target Year</label>
                      <div className="relative group">
                         <select 
                           value={selectedYear}
                           onChange={(e) => setSelectedYear(e.target.value)}
                           className="w-full appearance-none bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition-all"
                         >
                           {years.map(y => <option key={y} value={y}>{y}</option>)}
                         </select>
                         <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transform rotate-90 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* File Upload Sections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 text-left">
                       <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Magazine Issue (PDF)</label>
                       <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-white hover:border-gray-200 transition-all cursor-pointer group">
                          <Upload className="w-8 h-8 text-gray-300 group-hover:text-amber-500 transition-colors mb-4" strokeWidth={1.5} />
                          <p className="text-sm font-semibold text-gray-900">Choose PDF file</p>
                          <p className="text-xs text-gray-400 mt-1">Max file size: 50MB</p>
                       </div>
                    </div>
                    <div className="space-y-2 text-left">
                       <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Cover Image (JPG/PNG)</label>
                       <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-white hover:border-gray-200 transition-all cursor-pointer group">
                          <Plus className="w-8 h-8 text-gray-300 group-hover:text-amber-500 transition-colors mb-4" strokeWidth={1.5} />
                          <p className="text-sm font-semibold text-gray-900">Scan or Upload Cover</p>
                          <p className="text-xs text-gray-400 mt-1">Recommended: 1200x1600px</p>
                       </div>
                    </div>
                  </div>

                  <div className="pt-8 flex justify-end gap-4 border-t border-gray-50">
                     <button className="px-8 py-3.5 bg-gray-50 text-gray-500 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors">Discard</button>
                     <button className="px-10 py-3.5 bg-[#d4a017] text-white rounded-xl font-semibold text-sm shadow-xl shadow-amber-500/20 hover:bg-amber-600 transition-all transform hover:-translate-y-0.5">Publish Issue</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-6">
                <div className="text-left w-full lg:w-auto">
                  <h1 className="text-3xl font-serif font-semibold text-gray-900">User Management</h1>
                  <p className="text-sm text-gray-500 mt-1">Search, manage roles, and review account activity.</p>
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
                      <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-widest text-gray-400">User</th>
                      <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-widest text-gray-400">Plan / Role</th>
                      <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-widest text-gray-400">Last Activity</th>
                      <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-widest text-gray-400">Status</th>
                      <th className="px-8 py-5 text-right text-[10px] uppercase font-bold tracking-widest text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50/30 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs ring-2 ring-white">
                               {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                              <p className="text-xs text-gray-400">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-medium text-gray-600">{user.role}</td>
                        <td className="px-8 py-6 text-sm text-gray-400">{user.lastActive}</td>
                        <td className="px-8 py-6">
                           <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
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
                      <button className="px-4 py-2 hover:bg-gray-50 rounded border border-gray-100">Prev</button>
                      <button className="px-4 py-2 hover:bg-gray-50 rounded border border-gray-100">Next</button>
                   </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
