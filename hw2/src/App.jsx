import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Footer from './components/footer';
import Sidebar from './components/sidebar'
import Signup from './signup';
import Login from './login';
import Learn from './learn';
export const ipAddress = 'http://localhost:3000';
import AboutUs from './aboutus';
import ContactUs from './contactus';
import LetterUnit from './components/characters';
import LessonPages from './Lessonspage';
import Home from './home';
 

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
        <Sidebar darkMode={darkMode} onToggleTheme={toggleTheme} />
        <main className="flex-1 ml-64">
          <Routes>
          <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/components/characters" element={<LetterUnit />} />
            <Route path="/lessonspage/:lessonId" element={<LessonPages />} />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;