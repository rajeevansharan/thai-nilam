import { useState } from "react";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
    if (userData.role === "ADMIN" || userData.user?.role === "ADMIN") {
      setPage("admin");
    } else {
      setPage("home");
    }
  };

  if (page === "login") {
    return <Login onLogin={handleLogin} />;
  }

  if (page === "library") {
    return <Library onNavigate={setPage} user={user} />;
  }

  if (page === "profile") {
    return <Profile onNavigate={setPage} />;
  }

  if (page === "admin") {
    return <Admin onNavigate={setPage} />;
  }

  return <Home onNavigate={setPage} />;
}

export default App;
