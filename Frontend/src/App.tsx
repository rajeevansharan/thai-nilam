import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AdminProfile from "./pages/AdminProfile";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import "./App.css";

import type { User, Issue } from "./types";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (from localStorage or similar if needed)
    // For now, staying simple.
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (userData.role === "ADMIN") {
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
    setUser(null);
    navigate("/");
  };

  // Generic navigate func for components that expect it
  const onNavigate = (page: string) => {
    if (page === "landing") navigate("/");
    else navigate(`/${page}`);
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/home" element={<Home onNavigate={onNavigate} user={user} onUnlock={navigateToPayment} />} />
      <Route path="/library" element={<Library onNavigate={onNavigate} user={user} onUnlock={navigateToPayment} />} />
      <Route path="/profile" element={<Profile onNavigate={onNavigate} user={user} onLogout={handleLogout} onUnlock={navigateToPayment} />} />
      <Route path="/admin-profile" element={<AdminProfile onNavigate={onNavigate} user={user} onLogout={handleLogout} />} />
      <Route path="/admin" element={<Admin onNavigate={onNavigate} />} />
      <Route path="/payment" element={<Payment onNavigate={onNavigate} issue={selectedIssue} user={user} />} />
    </Routes>
  );
}

export default App;
