import React from 'react';
import heroImg from '../assets/download.jpg'; // Assuming download.jpg is a good cover

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#0F172A] text-white py-20 px-4 md:px-16 flex flex-col md:flex-row items-center justify-between">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M100 0 C 80 20, 60 40, 100 80" stroke="#d4a017" strokeWidth="0.5" fill="none" />
          <path d="M100 10 C 70 30, 50 60, 100 90" stroke="#d4a017" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl text-left">
        <div className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-[0.2em] text-[#d4a017]">
          <span>Latest Issue</span>
          <span className="text-gray-600">—</span>
          <span>March 2026</span>
        </div>
        
        <h1 className="mt-8 text-6xl md:text-7xl font-serif font-medium leading-[1.1] text-white">
          The Future of Design
        </h1>
        
        <p className="mt-8 text-lg font-light leading-relaxed max-w-lg text-gray-300">
          Exploring the intersection of AI, architecture, and human creativity in the modern age.
        </p>
        
        <div className="mt-12 flex flex-wrap gap-4">
          <button className="flex items-center gap-2 px-8 py-3.5 bg-[#d4a017] hover:bg-[#b8860b] text-white font-bold text-sm rounded shadow-lg transition-all transform hover:-translate-y-0.5">
            Unlock Issue
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          
          <button className="px-10 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm rounded border border-white/20 transition-colors">
            Preview
          </button>
        </div>
      </div>

      {/* Hero Magazine Cover Shadow/Container */}
      <div className="mt-16 md:mt-0 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#d4a017] to-amber-200 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-white p-4 rounded shadow-2xl overflow-hidden transform group-hover:rotate-2 transition duration-500">
          <div className="flex flex-col items-center justify-center border-2 border-gray-50 p-8 min-w-[280px]">
             <div className="text-3xl font-serif font-bold tracking-[0.2em] text-[#0F172A] mb-2">Thai Nilam</div>
             <div className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-8 border-b-2 border-gray-50 pb-2">Digital Magazine</div>
             <img src={heroImg} className="w-[200px] h-[280px] object-cover rounded-sm mb-6 shadow-md" alt="Latest Issue Cover" />
             <div className="text-[10px] italic font-serif text-gray-400">March 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
