import { User } from 'lucide-react';

interface HeaderProps {
  activePage?: string;
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage = 'home', onNavigate }) => {
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-white sticky top-0 z-50">
      <div 
        onClick={() => onNavigate?.('home')}
        className="text-3xl font-serif font-bold tracking-widest text-[#08060d] cursor-pointer"
      >
        ThaiNilam
      </div>
      <nav className="hidden md:flex items-center space-x-32">
        <button 
          onClick={() => onNavigate?.('home')}
          className={`text-xl font-medium transition-colors underline-offset-4 hover:underline decoration-1 ${activePage === 'home' ? 'text-gray-800' : 'text-gray-500'}`}
        >
          Home
        </button>
        <button 
          onClick={() => onNavigate?.('library')}
          className={`text-xl font-medium transition-colors underline-offset-4 hover:underline decoration-1 ${activePage === 'library' ? 'text-gray-800' : 'text-gray-500'}`}
        >
          Library
        </button>
        <button 
          onClick={() => onNavigate?.('profile')}
          className={`text-xl font-medium transition-colors underline-offset-4 hover:underline decoration-1 ${activePage === 'profile' ? 'text-gray-800' : 'text-gray-500'}`}
        >
          Profile
        </button>
      </nav>
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => onNavigate?.('profile')}
          className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${activePage === 'profile' ? 'bg-gray-100 text-[#d4a017]' : 'text-gray-400'}`}
        >
          <User className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
};

export default Header;
