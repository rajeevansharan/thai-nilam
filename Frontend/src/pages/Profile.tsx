import React, { useState, useEffect } from "react";
import {
  User,
  Settings,
  CreditCard,
  Bookmark,
  LogOut,
  ChevronRight,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IssueCard from "../components/IssueCard";
import { getFavorites, toggleFavorite } from "../services/issueService";
import type { User as UserType, Issue } from "../types";

interface ProfileProps {
  onNavigate?: (page: string) => void;
  user?: UserType | null;
  onLogout?: () => void;
  onUnlock?: (issue: Issue) => void;
}

const Profile: React.FC<ProfileProps> = ({
  onNavigate,
  user,
  onLogout,
  onUnlock,
}) => {
  const [activeTab, setActiveTab] = useState<"account" | "saved">("account");
  const [savedIssues, setSavedIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "saved" && user?.id) {
      const fetchSaved = async () => {
        setLoading(true);
        try {
          const data = await getFavorites(user.id);
          setSavedIssues(data);
        } catch (error) {
          console.error("Failed to fetch saved issues", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSaved();
    }
  }, [activeTab, user?.id]);

  const handleToggleFavorite = async (
    issueId: string | number,
    currentStatus: boolean
  ) => {
    if (!user?.id) return;

    // No-op use to satisfy linter
    void currentStatus;

    // Optimistically remove from saved
    setSavedIssues((prev) => prev.filter((issue) => issue.id !== issueId));

    try {
      await toggleFavorite(user.id, issueId);
    } catch (error) {
      console.error("Failed to toggle favorite", error);
    }
  };

  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:5000/${path.replace(/\\/g, "/")}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header activePage="profile" onNavigate={onNavigate} />

      <main className="max-w-[1400px] mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar / User Info */}
          <div className="lg:col-span-1 bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-50 shadow-sm h-fit">
            <div className="flex flex-col items-center text-center">
              <div className="w-full space-y-3">
                <button
                  onClick={() => setActiveTab("account")}
                  className={`flex items-center justify-between w-full px-6 py-4 rounded-xl text-xs font-bold transition-all border shadow-sm ${activeTab === "account" ? "bg-[#0F172A] text-white shadow-xl translate-x-2" : "text-gray-400 hover:text-[#0F172A] bg-white hover:border-[#d4a017]/20"}`}
                >
                  <span className="flex items-center gap-4">
                    <User
                      className={`w-4 h-4 ${activeTab === "account" ? "text-[#d4a017]" : "opacity-40"}`}
                    />{" "}
                    Account Details
                  </span>
                  {activeTab === "account" && (
                    <ChevronRight className="w-3 h-3 opacity-50" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("saved")}
                  className={`flex items-center justify-between w-full px-6 py-4 rounded-xl text-xs font-bold transition-all border shadow-sm ${activeTab === "saved" ? "bg-[#0F172A] text-white shadow-xl translate-x-2" : "text-gray-400 hover:text-[#0F172A] bg-white hover:border-[#d4a017]/20"}`}
                >
                  <span className="flex items-center gap-4">
                    <Bookmark
                      className={`w-4 h-4 ${activeTab === "saved" ? "text-[#d4a017]" : "opacity-40"}`}
                    />{" "}
                    Saved Collections
                  </span>
                  {activeTab === "saved" && (
                    <ChevronRight className="w-3 h-3 opacity-50" />
                  )}
                </button>
                <button className="flex items-center justify-between w-full px-6 py-4 text-gray-400 hover:text-[#0F172A] bg-white hover:bg-gray-50 rounded-xl text-xs font-bold transition-all border border-transparent hover:border-[#d4a017]/20">
                  <span className="flex items-center gap-4">
                    <CreditCard className="w-4 h-4 opacity-40" /> Billing & Payment
                  </span>
                </button>
                <button className="flex items-center justify-between w-full px-6 py-4 text-gray-400 hover:text-[#0F172A] bg-white hover:bg-gray-50 rounded-xl text-xs font-bold transition-all border border-transparent hover:border-[#d4a017]/20">
                  <span className="flex items-center gap-4">
                    <Settings className="w-4 h-4 opacity-40" /> Preferences
                  </span>
                </button>
                <div className="pt-12 border-t border-gray-100 mt-12">
                  <button
                    onClick={onLogout}
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 text-red-500 hover:bg-red-50/50 rounded-xl text-xs font-bold transition-all"
                  >
                    <LogOut className="w-4 h-4 opacity-70" /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-12 pl-4">
            {activeTab === "account" && (
              <section className="text-left bg-white p-12 rounded-3xl border border-gray-100 shadow-sm max-w-4xl">
                <div className="flex flex-col md:flex-row items-center gap-12 mb-16 pb-12 border-b border-gray-50">
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center ring-8 ring-[#d4a017]/5 overflow-hidden shadow-md border border-gray-100 shrink-0">
                    <User className="w-16 h-16 text-[#d4a017]" strokeWidth={1} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-serif font-bold text-[#0F172A] mb-4 leading-tight">
                      {user?.name || "Alex Morgan"}
                    </h1>
                    <p className="text-sm text-gray-400 italic">
                      Manage your profile and account settings from here.
                    </p>
                  </div>
                </div>

                <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] text-[#d4a017] mb-12 pb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#d4a017] rounded-full"></span>
                  Personal Information
                </h3>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-b border-gray-50 items-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                      Full Name
                    </span>
                    <span className="text-lg font-serif font-bold text-[#0F172A] md:col-span-2">
                      {user?.name || "Alex Morgan"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-b border-gray-50 items-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                      Email Address
                    </span>
                    <span className="text-lg font-serif font-bold text-[#0F172A] md:col-span-2">
                      {user?.email || "alex.morgan@example.com"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-b border-gray-50 items-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                      Member Status
                    </span>
                    <span className="text-lg font-serif font-bold text-[#d4a017] md:col-span-2 capitalize flex items-center gap-2">
                      {user?.isPremium || user?.role === "ADMIN" ? (
                        <>
                          <ShieldCheck className="w-5 h-5" />
                          Thai Nilam Premium
                        </>
                      ) : (
                        "Thai Nilam Free"
                      )}
                    </span>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "saved" && (
              <section className="text-left">
                <div className="mb-8">
                  <h2 className="text-3xl font-serif font-bold text-[#0F172A]">
                    Saved Collections
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Your personalized library of favorite issues.
                  </p>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 text-[#d4a017]">
                    <Loader2 className="w-8 h-8 animate-spin mb-4" />
                    <p className="text-xs font-bold tracking-widest uppercase">
                      Loading Favorites...
                    </p>
                  </div>
                ) : savedIssues.length === 0 ? (
                  <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center shadow-sm">
                    <Bookmark className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-lg font-serif text-[#0F172A] mb-2">
                      No saved issues yet
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                      Browse the library to find and save issues you love.
                    </p>
                    <button
                      onClick={() => onNavigate?.("library")}
                      className="px-6 py-2 bg-[#0F172A] text-white text-sm font-bold rounded shadow-md hover:bg-[#1E293B] transition-colors"
                    >
                      Explore Library
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {savedIssues.map((issue) => (
                      <IssueCard
                        key={issue.id}
                        id={issue.id}
                        image={getImageUrl(issue.imageUrl)}
                        month={`${issue.month} ${issue.year}`}
                        title={issue.title}
                        description={issue.description}
                        price={issue.price}
                        isPurchased={
                          issue.isPurchased ||
                          user?.isPremium ||
                          user?.role === "ADMIN"
                        }
                        isUnlocked={
                          issue.isPurchased ||
                          user?.isPremium ||
                          user?.role === "ADMIN"
                        }
                        isFavorite={true}
                        onToggleFavorite={handleToggleFavorite}
                        onUnlock={onUnlock}
                        contentImages={issue.contentImages}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
