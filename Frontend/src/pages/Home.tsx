import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import IssueCard from '../components/IssueCard';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';

// Importing images from assets
import issue1 from '../assets/download (1).jpg';
import issue2 from '../assets/download (2).jpg';
import issue3 from '../assets/download (3).jpg';

interface HomeProps {
  onNavigate?: (page: string) => void;
  onUnlock?: (issue: any) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onUnlock }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header activePage="home" onNavigate={onNavigate} />
      
      <main>
        <Hero />
        
        {/* Past Issues Section */}
        <section className="px-8 mt-24">
          <div className="flex items-end justify-between mb-12">
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#c49a6c] mb-2">Available Now</p>
              <h2 className="text-4xl font-serif font-medium text-gray-900">Past Issues</h2>
            </div>
            <button 
              onClick={() => onNavigate?.('library')}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors group"
            >
              View all
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <IssueCard 
              image={issue1}
              month="February 2026"
              title="Voices of Change"
              description="Profiles of visionaries reshaping industries from fashion to fintech. How modern leaders are rethinking the status quo."
              isPurchased={true}
              isUnlocked={true}
            />
            <IssueCard 
              image={issue2}
              month="January 2026"
              title="New Beginnings"
              description="A fresh perspective on culture, wellness, and the year ahead. Exploring the trends that will define our social fabric in 2026."
              isPurchased={true}
              isUnlocked={true}
            />
            <IssueCard 
              image={issue3}
              month="December 2025"
              title="Year in Review"
              description="The stories, trends, and moments that defined 2025. A visual retrospective of a year marked by unprecedented innovation."
              price="$4.99"
              isUnlocked={false}
              isPurchased={false}
              onUnlock={onUnlock}
            />
          </div>
        </section>

        {/* Call to Action or Featured Quote Section (Subtle) */}
        <section className="mt-40 mb-20 bg-gray-50 py-24 px-8 text-center border-y border-gray-100 italic font-serif text-3xl text-gray-400">
           "Design is not just what it looks like and feels like. <br/>
           Design is how it works."
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Home;
