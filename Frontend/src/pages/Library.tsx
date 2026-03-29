import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IssueCard from '../components/IssueCard';
import { Filter, ChevronDown } from 'lucide-react';

// Importing images from assets
import issueRecent from '../assets/download.jpg'; // Using the one from hero as the most recent
import issue1 from '../assets/download (1).jpg';
import issue2 from '../assets/download (2).jpg';
import issue3 from '../assets/download (3).jpg';

interface LibraryProps {
  onNavigate?: (page: string) => void;
}

const Library: React.FC<LibraryProps> = ({ onNavigate }) => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [selectedYear, setSelectedYear] = useState('2026');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const years = ['2026', '2025', '2024'];

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="library" onNavigate={onNavigate} />
      
      <main className="max-w-7xl mx-auto px-8 py-16">
        {/* Title Section */}
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-gray-400 mb-4">Complete Collection</p>
          <h1 className="text-5xl font-serif font-medium text-gray-900 mb-6 font-serif">Issues Library</h1>
          <p className="max-w-xl mx-auto text-gray-500 font-light leading-relaxed mb-12">
            Browse our archive of monthly editions. Unlock any issue to start reading instantly.
          </p>

          {/* Filter Bar */}
          <div className="flex items-center justify-center gap-4 mb-20 p-4 bg-gray-50 rounded-2xl w-fit mx-auto border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 px-3 text-gray-400">
              <Filter className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Filter By</span>
            </div>
            
            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            <div className="relative group">
              <select 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="appearance-none bg-transparent pl-4 pr-10 py-2 text-sm font-semibold text-gray-900 focus:outline-none cursor-pointer"
              >
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
            </div>

            <div className="relative group">
              <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none bg-transparent pl-4 pr-10 py-2 text-sm font-semibold text-gray-900 focus:outline-none cursor-pointer"
              >
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
            </div>
          </div>
        </div>

        {/* Library Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <IssueCard 
            image={issueRecent}
            month="March 2026"
            title="The Future of Design"
            description="Exploring the intersection of AI, architecture, and human creativity in the modern age."
            price="$4.99"
            isUnlocked={false}
            isPurchased={false}
          />
          <IssueCard 
            image={issue1}
            month="February 2026"
            title="Voices of Change"
            description="Profiles of visionaries reshaping industries from fashion to fintech."
            isPurchased={true}
            isUnlocked={true}
          />
          <IssueCard 
            image={issue2}
            month="January 2026"
            title="New Beginnings"
            description="A fresh perspective on culture, wellness, and the year ahead."
            isPurchased={true}
            isUnlocked={true}
          />
          <IssueCard 
            image={issue3}
            month="December 2025"
            title="Year in Review"
            description="The stories, trends, and moments that defined 2025."
            price="$4.99"
            isUnlocked={false}
            isPurchased={false}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Library;
