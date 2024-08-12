// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Signup from './signup';
import Login from './login';
import Learn from './learn';
import AboutUs from './aboutus';
import ContactUs from './contactus';
import LetterUnit from './components/characters';
import LessonPages from './Lessonspage';
import Home from './home';

export const ipAddress = 'http://localhost:3000';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(() => {
    // Initialize state from localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });// Authentication state

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    window.location.href = '/login'; // This refreshes the page
  };

  return (
    <Router>
      <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
        <Sidebar
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          user={user}
          onLogout={handleLogout}
        />
        <main className="flex-1 ml-64">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={<Signup onUserUpdate={handleLogin} />}
            />
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} />}
            />
            <Route path="/learn" element={<Learn />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/components/characters" element={<LetterUnit />} />
            <Route path="/Lessonspage/:unitId/:lessonId" element={<LessonPages />} />
            </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
