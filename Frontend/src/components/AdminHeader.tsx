import React from 'react';
import { User } from 'lucide-react';
import logo from '../assets/logoV2.png';

interface AdminHeaderProps {
  onNavigate?: (page: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onNavigate }) => {
  return (
    <header className="flex items-center justify-between px-8 py-2 bg-white sticky top-0 z-50 shadow-sm border-b border-[#d4a017]/20">
      <div 
        onClick={() => onNavigate?.('home')}
        className="cursor-pointer flex items-center py-2 group"
      >
        <img
          src={logo}
          alt="Thai Nilam"
          className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          draggable={false}
        />
      </div>

      {/* Profile icon */}
      <div className="flex items-center">
        <button
          onClick={() => onNavigate?.('profile')}
          className="p-2.5 rounded-full transition-all duration-200 text-gray-400 hover:bg-gray-50 hover:text-[#0F172A]"
        >
          <User className="w-5 h-5" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
