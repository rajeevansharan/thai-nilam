import React from 'react';
import homeHero from '../assets/Home-heroV2.png';

const Hero: React.FC = () => {
  return (
    <div className="bg-[#FBF9F4] text-[#0F172A] py-12 md:py-20 px-6 sm:px-12 md:px-24 flex flex-col md:flex-row items-center justify-between gap-12 border-b border-gray-100">
      <div className="w-full md:max-w-xl text-left">
        <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] md:tracking-[0.4em] text-[#d4a017] mb-4 md:mb-6">
          Our Publication
        </p>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight text-[#0F172A]">
          Thai Nilam <br className="hidden md:block"/>
          <span className="text-[#d4a017]">Digital Magazine</span>
        </h1>
        
        <div className="mt-6 md:mt-10 space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed font-medium">
          <p>
            Thai Nilam is a premium Tamil digital magazine platform delivering curated stories,
            perspectives, and ideas to readers every month. We believe in the power of Tamil literature
            and aim to bring quality content to young professionals and casual readers alike.
          </p>
          <p>
            Our mission is to preserve and promote Tamil literary culture through a modern, 
            accessible digital platform that connects writers with readers across the world. 
            Each issue is carefully crafted to offer a rich, immersive reading experience.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 max-w-lg">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
           <img 
             src={homeHero} 
             className="w-full h-auto object-cover" 
             alt="Magazine Publishing" 
           />
        </div>
      </div>
    </div>
  );
};

export default Hero;
