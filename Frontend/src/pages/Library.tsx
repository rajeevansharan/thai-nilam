import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IssueCard from "../components/IssueCard";

import { Filter, ChevronDown, Loader2 } from "lucide-react";
import { getAllIssues, toggleFavorite } from "../services/issueService";
import { getImageUrl } from "../config/api";
import type { User, Issue } from "../types";

interface LibraryProps {
  onNavigate?: (page: string) => void;
  user?: User | null;
  onUnlock?: (issue: Issue) => void;
  onRead?: (issue: Issue) => void;
}


const Library: React.FC<LibraryProps> = ({ onNavigate, user, onUnlock, onRead }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("en-US", { month: "long" });
  const currentYear = currentDate.getFullYear().toString();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [issues, setIssues] = useState<Issue[]>([]);
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

  // Removed local getImageUrl helper

  const handleToggleFavorite = async (
    issueId: string | number,
    currentStatus: boolean,
  ) => {
    if (!user) {
      alert("Please login to save favourites.");
      onNavigate?.("login");
      return;
    }
    
    const userId = user.id;
    if (!userId) {
      console.error("User ID missing even after login check");
      return;
    }

    setIssues(
      issues.map((issue) =>
        issue.id === issueId ? { ...issue, isFavorite: !currentStatus } : issue,
      ),
    );

    try {
      await toggleFavorite(userId, issueId);
    } catch (error) {
      console.error("Failed to toggle favorite", error);
      setIssues(
        issues.map((issue) =>
          issue.id === issueId
            ? { ...issue, isFavorite: currentStatus }
            : issue,
        ),
      );
    }
  };

   const handleRead = (issue: Issue) => {
    onRead?.(issue);
  };


  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header activePage="library" onNavigate={onNavigate} />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 md:py-16">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] md:tracking-[0.4em] text-[#d4a017] mb-3 md:mb-4">
            Complete Collection
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#0F172A] mb-4 md:mb-6 shadow-sm shadow-white/50">
            Issues Library
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-500 font-light leading-relaxed mb-8 md:mb-12 italic px-4">
            Browse our archive of monthly Thai Nilam issues. Unlock any issue to start
            reading instantly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12 md:mb-20 p-2 md:p-4 bg-white rounded-2xl w-fit mx-auto border border-[#0F172A]/5 shadow-lg shadow-[#0F172A]/5">
            <div className="flex items-center gap-2 px-2 md:px-3 text-[#d4a017]">
              <Filter className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-[#0F172A]">
                Filter
              </span>
            </div>

            <div className="h-6 w-px bg-gray-100 mx-1 md:mx-2 hidden sm:block"></div>

            <div className="relative group">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="appearance-none bg-transparent pl-3 pr-8 md:pl-4 md:pr-10 py-1.5 md:py-2 text-[11px] md:text-sm font-bold text-[#0F172A] focus:outline-none cursor-pointer"
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#d4a017] pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
            </div>

            <div className="relative group">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none bg-transparent pl-3 pr-8 md:pl-4 md:pr-10 py-1.5 md:py-2 text-[11px] md:text-sm font-bold text-[#0F172A] focus:outline-none cursor-pointer"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#d4a017] pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center p-12 text-[#d4a017]">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p className="font-bold tracking-widest uppercase text-xs text-[#0F172A]">Loading Library...</p>
            </div>
          ) : issues.length === 0 ? (
            <div className="col-span-full text-center text-[#0F172A]/30 py-12 italic">
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
                isFavorite={issue.isFavorite}
                onUnlock={onUnlock}
                onRead={handleRead}
                onToggleFavorite={handleToggleFavorite}
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
