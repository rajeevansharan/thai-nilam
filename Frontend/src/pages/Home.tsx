import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import IssueCard from "../components/IssueCard";
import Footer from "../components/Footer";
import { ArrowRight, Loader2 } from "lucide-react";
import { toggleFavorite } from "../services/issueService";
import type { User, Issue } from "../types";

interface HomeProps {
  onNavigate?: (page: string) => void;
  user?: User | null;
  onUnlock?: (issue: Issue) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, user, onUnlock }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/issues/recent${user?.id ? `?userId=${user.id}` : ""}`
        );
        const data = await response.json();
        setIssues(data);
      } catch (error) {
        console.error("Failed to fetch recent issues", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, [user?.id]);

  const handleToggleFavorite = async (
    issueId: string | number,
    currentStatus: boolean
  ) => {
    if (!user?.id) {
      alert("Please login to save favorites.");
      onNavigate?.("login");
      return;
    }

    // Optimistic UI update
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === issueId ? { ...issue, isFavorite: !currentStatus } : issue
      )
    );

    try {
      await toggleFavorite(user.id, issueId);
    } catch (error) {
      console.error("Failed to toggle favorite", error);
      // Revert on failure
      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === issueId ? { ...issue, isFavorite: currentStatus } : issue
        )
      );
    }
  };

  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:5000/${path.replace(/\\/g, "/")}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header activePage="home" onNavigate={onNavigate} />
      
      <main>
        <Hero />
        
        {/* Past Issues Section */}
        <section className="px-8 mt-24">
          <div className="flex items-end justify-between mb-12 max-w-7xl mx-auto">
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#d4a017] mb-2">
                Available Now
              </p>
              <h2 className="text-4xl font-serif font-bold text-[#0F172A]">
                Recent Issues
              </h2>
            </div>
            <button
              onClick={() => onNavigate?.("library")}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d4a017] hover:text-[#b8860b] transition-colors group"
            >
              View all
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center p-12 text-[#d4a017]">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p className="font-bold tracking-widest uppercase text-xs text-[#0F172A]">
                  Loading Issues...
                </p>
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
                  isUnlocked={
                    issue.isPurchased ||
                    user?.isPremium ||
                    user?.role === "ADMIN"
                  }
                  isFavorite={issue.isFavorite}
                  onUnlock={onUnlock}
                  onToggleFavorite={handleToggleFavorite}
                  contentImages={issue.contentImages}
                />
              ))
            )}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Home;
