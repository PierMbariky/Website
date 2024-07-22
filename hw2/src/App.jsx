import React, { useEffect, useState } from 'react';
import Header from './components/header';
export const ipAddress = 'https://finalserver-dunm.onrender.com'; // Define a constant for the IP address or server endpoint

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => {
        setBackendData(data);
      });
  }, []);

  const toggleTheme = () => {
    console.log("in");
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Header darkMode={darkMode} onToggleTheme={toggleTheme} />
      <section className="py-2 dark:bg-gray-800">
        <div className="hero-body">
          <div className="flex justify-center">  
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Engaging Minds: Where Learning Becomes an Adventure!</h1>
          </div>    
          <div className="container mx-auto p-20">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Why Choose Engaging Minds?</h2>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                <div className="bg-white dark:bg-gray-800 rounded shadow-md p-4">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Make Learning Fun</h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">Ditch the textbooks and dive into interactive quests, engaging scenarios, and bite-sized challenges that make learning truly enjoyable.</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                <div className="bg-white dark:bg-gray-800 rounded shadow-md p-4">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Level Up Your Skills</h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">Earn points for completing activities, progress through levels, and unlock badges that showcase your achievements.</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                <div className="bg-white dark:bg-gray-800 rounded shadow-md p-4">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Become a Master</h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">Compete with friends or a global audience on leaderboards, pushing yourself to become the ultimate knowledge champion.</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                <div className="bg-white dark:bg-gray-800 rounded shadow-md p-4">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Connect with Fellow Learners</h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">Join our vibrant community forums and chat rooms, where you can discuss concepts, ask questions, and collaborate with fellow learners.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Embark on Your Learning Adventure?</h2>
          <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">Sign up for free and explore our vast library of courses!</p>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Sign Up for Free!</button><br />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Browse Courses Now!</button>
        </div>
      </section>
      <footer className="py-10 bg-gray-200 dark:bg-gray-800">
        <div className="container mx-auto p-4">
          <p className="text-lg text-center text-gray-700 dark:text-gray-300">Copyright 2023 Engaging Minds. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
