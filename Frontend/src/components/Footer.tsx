import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-32 py-24 px-8 bg-[#0F172A] text-white">
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        <div className="text-4xl font-serif font-bold tracking-[0.2em] text-[#d4a017] mb-4">
          Thai Nilam
        </div>
        <p className="text-sm font-medium text-gray-400 uppercase tracking-[0.2em] mb-12">
          Premium digital magazine — new issue every month.
        </p>

        <div className="flex items-center space-x-12 mb-12">
          <a href="#" className="text-sm font-medium text-[#d4a017] hover:text-white transition-colors underline-offset-4 hover:underline decoration-1 italic">Sign In</a>
          <a href="#" className="text-sm font-medium text-[#d4a017] hover:text-white transition-colors underline-offset-4 hover:underline decoration-1 italic">Library</a>
          <a href="#" className="text-sm font-medium text-[#d4a017] hover:text-white transition-colors underline-offset-4 hover:underline decoration-1 italic">Account</a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full border-t border-white/10 pt-8 mt-8">
           <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
             &copy; 2026 Thai Nilam Magazine. All rights reserved.
           </p>
           <div className="flex space-x-6 mt-4 md:mt-0">
             <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-[#d4a017] hover:text-white">Privacy</a>
             <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-[#d4a017] hover:text-white">Terms</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
