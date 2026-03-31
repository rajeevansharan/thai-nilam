import { useState } from "react";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState<any>(null);
  const [selectedIssue, setSelectedIssue] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
    if (userData.role === "ADMIN" || userData.user?.role === "ADMIN") {
      setPage("admin");
    } else {
      setPage("home");
    }
  };

  const navigateToPayment = (issue: any) => {
    setSelectedIssue(issue);
    setPage("payment");
  };

  if (page === "login") {
    return <Login onLogin={handleLogin} />;
  }

  if (page === "library") {
    return <Library onNavigate={setPage} user={user} onUnlock={navigateToPayment} />;
  }

  if (page === "profile") {
    return <Profile onNavigate={setPage} />;
  }

  if (page === "admin") {
    return <Admin onNavigate={setPage} />;
  }

  if (page === "payment") {
    return <Payment onNavigate={setPage} issue={selectedIssue} user={user} />;
  }

  return <Home onNavigate={setPage} onUnlock={navigateToPayment} />;
}

export default App;
