import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AdminProfile from "./pages/AdminProfile";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import PDFReader from "./components/PDFReader";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import "./App.css";


import type { User, Issue } from "./types";

function App() {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("thai_nilam_user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (err) {
        console.error("Failed to restore session", err);
        return null;
      }
    }
    return null;
  });
   const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [readerIssue, setReaderIssue] = useState<Issue | null>(() => {
    const saved = localStorage.getItem("current_reading_issue");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to restore reading session", err);
        return null;
      }
    }
    return null;
  });

  const navigate = useNavigate();

  const handleLogin = (userData: User) => {
    // Map _id or other common ID fields if necessary
    const normalizedUser = {
      ...userData,
      id: userData.id || (userData as any)._id || (userData as any).userId
    };
    setUser(normalizedUser);
    localStorage.setItem("thai_nilam_user", JSON.stringify(normalizedUser));
    
    if (normalizedUser.role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  };

  const navigateToPayment = (issue: Issue) => {
    setSelectedIssue(issue);
    navigate("/payment");
  };

   const handleLogout = () => {
    localStorage.removeItem("thai_nilam_user");
    setUser(null);
    navigate("/");
  };

  const handleRead = (issue: Issue) => {
    setReaderIssue(issue);
    localStorage.setItem("current_reading_issue", JSON.stringify(issue));
  };

  const closeReader = () => {
    setReaderIssue(null);
    localStorage.removeItem("current_reading_issue");
  };


  // Generic navigate func for components that expect it
  const onNavigate = (page: string) => {
    if (page === "landing") navigate("/");
    else navigate(`/${page}`);
  };

  return (
     <div className="app-container">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/home" element={<Home onNavigate={onNavigate} user={user} onUnlock={navigateToPayment} onRead={handleRead} />} />
        <Route path="/library" element={<Library onNavigate={onNavigate} user={user} onUnlock={navigateToPayment} onRead={handleRead} />} />
        <Route path="/profile" element={<Profile onNavigate={onNavigate} user={user} onLogout={handleLogout} onUnlock={navigateToPayment} onRead={handleRead} />} />
        <Route path="/admin-profile" element={<AdminProfile onNavigate={onNavigate} user={user} onLogout={handleLogout} />} />
        <Route path="/admin" element={<Admin onNavigate={onNavigate} />} />
        <Route path="/payment" element={<Payment onNavigate={onNavigate} issue={selectedIssue} user={user} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
      </Routes>

      {readerIssue && (
        <PDFReader 
          onClose={closeReader}
          pdfUrl={readerIssue.pdfUrl}
          issueTitle={readerIssue.title}
        />
      )}
    </div>

  );
}

export default App;
