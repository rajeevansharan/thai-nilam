import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import IssueCard from "../components/IssueCard";
import Footer from "../components/Footer";
import PDFReader from "../components/PDFReader";
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
  const [readerIssue, setReaderIssue] = useState<Issue | null>(null);

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

    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === issueId ? { ...issue, isFavorite: !currentStatus } : issue
      )
    );

    try {
      await toggleFavorite(userId, issueId);
    } catch (error) {
      console.error("Failed to toggle favorite", error);
      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === issueId ? { ...issue, isFavorite: currentStatus } : issue
        )
      );
    }
  };

  const handleRead = (issue: Issue) => {
    const fullIssue = issues.find(i => String(i.id) === String(issue.id));
    if (fullIssue) {
      setReaderIssue(fullIssue);
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
        
        <section className="px-4 sm:px-8 mt-16 md:mt-24">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-12 max-w-7xl mx-auto gap-4">
            <div className="text-left">
              <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] md:tracking-[0.3em] text-[#d4a017] mb-2">
                Available Now
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F172A]">
                Recent Issues
              </h2>
            </div>
            <button
              onClick={() => onNavigate?.("library")}
              className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#d4a017] hover:text-[#b8860b] transition-colors group"
            >
              View all
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 max-w-7xl mx-auto">
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
                  onRead={handleRead}
                  onToggleFavorite={handleToggleFavorite}
                  contentImages={issue.contentImages}
                />
              ))
            )}
          </div>
        </section>
      </main>

      {readerIssue && (
        <PDFReader 
          onClose={() => setReaderIssue(null)}
          pdfUrl={readerIssue?.pdfUrl || ""}
          issueTitle={readerIssue?.title || ""}
        />
      )}

      <Footer />
    </div>
  );
};

export default Home;
