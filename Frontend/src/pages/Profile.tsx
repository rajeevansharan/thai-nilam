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
  Heart,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IssueCard from "../components/IssueCard";
import PDFReader from "../components/PDFReader";
import { getFavorites, toggleFavorite } from "../services/issueService";
import { getImageUrl } from "../config/api";
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
  const [readerIssue, setReaderIssue] = useState<Issue | null>(null);

  useEffect(() => {
    if (activeTab === "saved" && user?.id) {
      const fetchSaved = async () => {
        setLoading(true);
        try {
          const data = await getFavorites(user.id);
          setSavedIssues(data || []);
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

  const handleRead = (issue: Issue) => {
    const fullIssue = savedIssues.find(i => String(i.id) === String(issue.id));
    if (fullIssue) {
      setReaderIssue(fullIssue);
    }
  };

  // Removed local getImageUrl helper

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header activePage="profile" onNavigate={onNavigate} />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Sidebar / User Info */}
          <div className="lg:col-span-1">
            {/* Desktop Sidebar (hidden on mobile) */}
            <div className="hidden lg:block bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-50 shadow-sm h-fit space-y-3">
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
                  <Heart
                    className={`w-4 h-4 ${activeTab === "saved" ? "text-[#d4a017]" : "opacity-40"}`}
                  />{" "}
                  Favourites
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

            {/* Mobile Tabbed Navigation (shown on mobile) */}
            <div className="lg:hidden flex overflow-x-auto gap-2 p-2 bg-white rounded-2xl border border-gray-100 shadow-sm scrollbar-hide mb-6">
              {[
                { id: "account", label: "Account", icon: User },
                { id: "saved", label: "Favourites", icon: Heart },
                { id: "billing", label: "Billing", icon: CreditCard },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === "account" || item.id === "saved") {
                      setActiveTab(item.id);
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all ${
                    activeTab === item.id 
                    ? "bg-[#0F172A] text-white shadow-md" 
                    : "text-gray-400 hover:text-[#0F172A]"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              ))}
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-[10px] font-bold whitespace-nowrap text-red-500 hover:bg-red-50"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8 md:space-y-12 lg:pl-4">
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
              <section className="text-left animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-12 border-b border-gray-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-1.5 bg-[#d4a017] rounded-full"></div>
                      <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-[#d4a017]">Your Archive</span>
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-[#0F172A]">
                      Favourites
                    </h2>
                    <p className="text-slate-400 text-sm mt-3 font-medium max-w-md leading-relaxed">
                      Your personalized architectural library of curated stories, perspectives and premium issues.
                    </p>
                  </div>
                  {savedIssues.length > 0 && (
                    <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Saved</span>
                        <span className="text-xl font-serif font-bold text-[#0F172A]">{savedIssues.length}</span>
                    </div>
                  )}
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-32 text-[#d4a017]">
                    <div className="relative w-16 h-16 mb-6">
                      <div className="absolute inset-0 border-2 border-[#d4a017]/10 rounded-full"></div>
                      <Loader2 className="absolute inset-0 w-full h-full text-[#d4a017] animate-spin" />
                    </div>
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">
                      Syncing Library...
                    </p>
                  </div>
                ) : savedIssues.length === 0 ? (
                  <div className="bg-white p-20 rounded-[2.5rem] border border-gray-100 text-center shadow-sm max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Bookmark className="w-8 h-8 text-gray-200" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#0F172A] mb-4">
                      Empty Collection
                    </h3>
                    <p className="text-slate-400 mb-10 leading-relaxed text-sm">
                      It seems you haven't saved any issues to your collection yet. 
                      Bookmark your favorite stories to find them easily later.
                    </p>
                    <button
                      onClick={() => onNavigate?.("library")}
                      className="px-10 py-4 bg-[#0F172A] text-white text-xs font-bold rounded-xl shadow-xl shadow-slate-900/10 hover:bg-black transition-all transform hover:-translate-y-1"
                    >
                      Explore Full Library
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
                    {savedIssues.map((issue) => (
                      <div key={issue.id} className="scale-95 hover:scale-100 transition-transform duration-500 origin-top">
                        <IssueCard
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
                          onRead={handleRead}
                          contentImages={issue.contentImages}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </main>

      {readerIssue && (
        <PDFReader 
          onClose={() => setReaderIssue(null)}
          pdfUrl={readerIssue.pdfUrl}
          issueTitle={readerIssue.title}
        />
      )}

      <Footer />
    </div>
  );
};

export default Profile;
