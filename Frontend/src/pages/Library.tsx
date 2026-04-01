import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IssueCard from "../components/IssueCard";
import { Filter, ChevronDown, Loader2 } from "lucide-react";
import { getAllIssues } from "../services/issueService";

interface LibraryProps {
  onNavigate?: (page: string) => void;
  user?: any;
  onUnlock?: (issue: any) => void;
}

const Library: React.FC<LibraryProps> = ({ onNavigate, user, onUnlock }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("en-US", { month: "long" });
  const currentYear = currentDate.getFullYear().toString();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["All", "2026", "2025", "2024"];

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      try {
        const data = await getAllIssues(selectedMonth, selectedYear, user?.id);
        setIssues(data);
      } catch (error) {
        console.error("Failed to fetch issues", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, [selectedMonth, selectedYear, user?.id]);

  // Helper to resolve backend image paths
  const getImageUrl = (path: string) => {
    if (path.startsWith("http")) return path;
    return `http://localhost:5000/${path.replace(/\\/g, "/")}`; // Ensure forward slashes for URLs
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="library" onNavigate={onNavigate} />

      <main className="max-w-7xl mx-auto px-8 py-16">
        {/* Title Section */}
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-gray-400 mb-4">
            Complete Collection
          </p>
          <h1 className="text-5xl font-serif font-medium text-gray-900 mb-6 font-serif">
            Issues Library
          </h1>
          <p className="max-w-xl mx-auto text-gray-500 font-light leading-relaxed mb-12">
            Browse our archive of monthly Thai Nilam issues. Unlock any issue to start
            reading instantly.
          </p>

          {/* Filter Bar */}
          <div className="flex items-center justify-center gap-4 mb-20 p-4 bg-gray-50 rounded-2xl w-fit mx-auto border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 px-3 text-gray-400">
              <Filter className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-widest">
                Filter By
              </span>
            </div>

            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            <div className="relative group">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="appearance-none bg-transparent pl-4 pr-10 py-2 text-sm font-semibold text-gray-900 focus:outline-none cursor-pointer"
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
            </div>

            <div className="relative group">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none bg-transparent pl-4 pr-10 py-2 text-sm font-semibold text-gray-900 focus:outline-none cursor-pointer"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
            </div>
          </div>
        </div>

        {/* Library Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center p-12 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p>Loading your library...</p>
            </div>
          ) : issues.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              No issues found for this period.
            </div>
          ) : (
            issues.map((issue) => (
              <IssueCard
                key={issue.id}
                id={issue.id}
                image={getImageUrl(issue.imageUrl)}
                month={`${issue.month} ${issue.year}`}
                title={issue.title}
                description={issue.description}
                price={issue.price}
                isPurchased={issue.isPurchased}
                isUnlocked={issue.isPurchased || user?.role === "ADMIN"}
                onUnlock={onUnlock}
                contentImages={issue.contentImages}
              />
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Library;
