import { useState } from "react";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AdminProfile from "./pages/AdminProfile";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import "./App.css";

import type { User, Issue } from "./types";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState<User | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (userData.role === "ADMIN") {
      setPage("admin");
    } else {
      setPage("home");
    }
  };

  const navigateToPayment = (issue: Issue) => {
    setSelectedIssue(issue);
    setPage("payment");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  if (page === "login") {
    return <Login onLogin={handleLogin} />;
  }

  if (page === "library") {
    return <Library onNavigate={setPage} user={user} onUnlock={navigateToPayment} />;
  }

  if (page === "profile") {
    return (
      <Profile
        onNavigate={setPage}
        user={user}
        onLogout={handleLogout}
        onUnlock={navigateToPayment}
      />
    );
  }

  if (page === "admin-profile") {
    return (
      <AdminProfile
        onNavigate={setPage}
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "admin") {
    return <Admin onNavigate={setPage} />;
  }

  if (page === "payment") {
    return <Payment onNavigate={setPage} issue={selectedIssue} user={user} />;
  }

  return <Home onNavigate={setPage} user={user} onUnlock={navigateToPayment} />;
}

export default App;
