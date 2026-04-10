import { useState } from 'react';
import { User, Menu, X } from 'lucide-react';

import logo from '../assets/logoV2.png';

interface HeaderProps {
  activePage?: string;
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage = 'home', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate?.(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#d4a017]/20">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-2">
        <div 
          onClick={() => handleNavigate('home')}
          className="cursor-pointer flex items-center py-2 group"
        >
          <img
            src={logo}
            alt="Thai Nilam"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            draggable={false}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-16">
          {(['home', 'library', 'profile'] as const).map((page) => (
            <button
              key={page}
              onClick={() => handleNavigate(page)}
              className={`relative text-[15px] font-bold tracking-wide capitalize transition-colors duration-200 py-5
                ${activePage === page ? 'text-[#0F172A]' : 'text-gray-400 hover:text-[#d4a017]'}
              `}
            >
              {page}
              {/* Active indicator bar */}
              <span
                className={`absolute left-0 right-0 -bottom-px h-[3px] rounded-t-full transition-all duration-300
                  ${activePage === page ? 'bg-[#d4a017] scale-x-100' : 'bg-transparent scale-x-0'}
                `}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Profile icon */}
          <button
            onClick={() => handleNavigate('profile')}
            className={`p-2.5 rounded-full transition-all duration-200
              ${activePage === 'profile'
                ? 'bg-[#0F172A] text-white shadow-lg'
                : 'text-gray-400 hover:bg-gray-50 hover:text-[#0F172A]'
              }`}
          >
            <User className="w-5 h-5" strokeWidth={2} />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-100 ${
          mobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 border-t-0'
        }`}
      >
        <nav className="flex flex-col px-4 py-3 bg-white space-y-1">
          {(['home', 'library', 'profile'] as const).map((page) => (
            <button
              key={page}
              onClick={() => handleNavigate(page)}
              className={`text-left px-4 py-3 rounded-xl text-sm font-bold capitalize transition-all duration-200
                ${activePage === page
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-[#0F172A]'
                }
              `}
            >
              {page}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
