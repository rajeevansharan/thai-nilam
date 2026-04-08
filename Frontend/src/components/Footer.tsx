import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 py-10 px-8 md:px-20 bg-[#0F172A] text-white w-full border-t border-white/5">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Branding Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="text-2xl font-serif font-bold tracking-[0.1em] text-[#d4a017]">
            Thai Nilam
          </div>
          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.2em] mt-1">
            Premium digital magazine — new issue every month.
          </p>
        </div>

        {/* Navigation Section */}
        <nav className="flex items-center space-x-10">
          <Link to="/home" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#d4a017] transition-all hover:scale-105 active:scale-95">Home</Link>
          <Link to="/library" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#d4a017] transition-all hover:scale-105 active:scale-95">Library</Link>
          <Link to="/profile" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#d4a017] transition-all hover:scale-105 active:scale-95">Account</Link>
        </nav>

        {/* Legal & Copyright Section */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
           <div className="flex space-x-6 mb-2">
             <a href="#" className="text-[9px] uppercase font-bold tracking-widest text-gray-500 hover:text-[#d4a017] transition-colors">Privacy Policy</a>
             <a href="#" className="text-[9px] uppercase font-bold tracking-widest text-gray-500 hover:text-[#d4a017] transition-colors">Terms of Service</a>
           </div>
           <p className="text-[9px] uppercase font-bold tracking-widest text-gray-600 opacity-60">
             &copy; 2026 Thai Nilam Magazine. All rights reserved.
           </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
