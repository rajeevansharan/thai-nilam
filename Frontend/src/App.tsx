import { useState } from 'react';
import Home from './pages/Home';
import Library from './pages/Library';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Login from './pages/Login';
import './App.css';

function App() {
  const [page, setPage] = useState('login');

  const handleLogin = (email: string, pass: string) => {
    if (email === 'admin@edition.com' && pass === 'admin123') {
      setPage('admin');
    } else if (email === 'reader@edition.com' && pass === 'edition123') {
      setPage('home');
    } else {
      // For any other mock login during dev, default to home
      setPage('home');
    }
  };

  if (page === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  if (page === 'library') {
    return <Library onNavigate={setPage} />;
  }

  if (page === 'profile') {
    return <Profile onNavigate={setPage} />;
  }

  if (page === 'admin') {
    return <Admin onNavigate={setPage} />;
  }

  return <Home onNavigate={setPage} />;
}

export default App;
