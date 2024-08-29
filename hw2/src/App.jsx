import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Footer from './components/footer'; // Import the Footer component
import Signup from './components/signup';
import Login from './components/login';
import Learn from './components/learn';
import AboutUs from './components/aboutus';
import ContactUs from './components/contactus';
import LetterUnit from './components/characters';
import LessonPages from './components/Lessonspage';
import Home from './components/home';

export const ipAddress = 'https://website-black-delta-36.vercel.app/';
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [isSlim, setIsSlim] = useState(window.innerWidth <= 1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
      setIsSlim(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    window.location.href = '/login';
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
        {/* Only render the hamburger button when isMobile is false */}
        {!isMobile && (
          <button
            className="fixed top-0 left-0 z-50 p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        {/* Conditionally render the sidebar based on the sidebarOpen state and isMobile state */}
        {!isMobile && sidebarOpen && (
          <Sidebar
            darkMode={darkMode}
            onToggleTheme={toggleTheme}
            user={user}
            onLogout={handleLogout}
            isSlim={isSlim}
          />
        )}

        <main className={`flex-1 ${!isMobile ? (!sidebarOpen ? '':(isSlim ? 'ml-16' : 'ml-40')) : 'mb-16'}`}>
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

        {isMobile ? (
          <Footer
            darkMode={darkMode}
            onToggleTheme={toggleTheme}
            user={user}
            onLogout={handleLogout}
          />
        ) : null}
      </div>
    </Router>
  );
}

export default App;