import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-32 mb-16 px-8 border-t border-gray-100 pt-16">
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        <div className="text-4xl font-serif font-bold tracking-[0.2em] text-[#08060d] mb-4">
          Thai Nilam
        </div>
        <p className="text-sm font-medium text-gray-400 uppercase tracking-[0.2em] mb-12">
          Premium digital magazine — new issue every month.
        </p>

        <div className="flex items-center space-x-12 mb-12">
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-black transition-colors underline-offset-4 hover:underline decoration-1 italic">Sign In</a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-black transition-colors underline-offset-4 hover:underline decoration-1 italic">Library</a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-black transition-colors underline-offset-4 hover:underline decoration-1 italic">Account</a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full border-t border-gray-50 pt-8 opacity-40">
           <p className="text-[10px] uppercase font-bold tracking-widest text-[#08060d]">
             &copy; 2026 Thai Nilam Magazine. All rights reserved.
           </p>
           <div className="flex space-x-6 mt-4 md:mt-0">
             <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-black">Privacy</a>
             <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-black">Terms</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
