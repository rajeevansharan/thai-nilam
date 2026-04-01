import { User } from 'lucide-react';

import logo from '../assets/logoV2.png';

interface HeaderProps {
  activePage?: string;
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage = 'home', onNavigate }) => {
  return (
    <header className="flex items-center justify-between px-8 py-2 bg-white sticky top-0 z-50 shadow-sm">
      <div 
        onClick={() => onNavigate?.('home')}
        className="cursor-pointer flex items-center py-2 group"
      >
        <img
          src={logo}
          alt="Thai Nilam"
          className="h-14 w-auto object-contain bg-white transition-transform duration-300 group-hover:scale-105"
          style={{ background: '#ffffff' }}
          draggable={false}
        />
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-16">
        {(['home', 'library', 'profile'] as const).map((page) => (
          <button
            key={page}
            onClick={() => onNavigate?.(page)}
            className={`relative text-[15px] font-medium tracking-wide capitalize transition-colors duration-200 py-5
              ${activePage === page ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'}
            `}
          >
            {page}
            {/* Active indicator bar */}
            <span
              className={`absolute left-0 right-0 -bottom-px h-[2px] rounded-full transition-all duration-300
                ${activePage === page ? 'bg-[#d4a017] scale-x-100' : 'bg-transparent scale-x-0'}
              `}
            />
          </button>
        ))}
      </nav>

      {/* Profile icon */}
      <div className="flex items-center">
        <button
          onClick={() => onNavigate?.('profile')}
          className={`p-2.5 rounded-full transition-all duration-200
            ${activePage === 'profile'
              ? 'bg-amber-50 text-[#d4a017] ring-1 ring-amber-200'
              : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
            }`}
        >
          <User className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
};

export default Header;
