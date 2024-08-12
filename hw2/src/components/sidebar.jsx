// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ darkMode, onToggleTheme, user, onLogout }) {
  return (
    <nav className={`fixed top-0 left-0 h-full w-64 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} p-4 shadow-lg`}>
      <div className="flex items-center mb-6">
        <a href="/home" className="text-2xl font-bold hover:text-gray-700 dark:hover:text-white transition duration-300 ease-in-out">Playwise</a>
      </div>
      <div className="flex flex-col mt-auto">
        <Link to="/learn">
          <button className="bg-purple-500 hover:bg-purple-700 text-black dark:text-white font-bold py-2 px-4 rounded-md mb-4 flex items-center">
            <img src="https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg" alt="Learn Icon" className="h-6 w-6 mr-2" />
            Learn
          </button>
        </Link>
        <Link to="/components/characters">
          <button className="bg-orange-500 hover:bg-orange-700 text-black dark:text-white font-bold py-2 px-4 rounded-md mb-4 flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/128/330/330530.png" alt="Letters Icon" className="h-6 w-6 mr-2" />
            Letters
          </button>
        </Link>
        {!user ? (
          <>
            <Link to="/login">
              <button className="bg-blue-500 hover:bg-blue-700 text-black dark:text-white font-bold py-2 px-4 rounded-md mb-4 flex items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/14175/14175078.png" alt="Log In Icon" className="h-6 w-6 mr-2" />
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-pink-500 hover:bg-pink-700 text-black dark:text-white font-bold py-2 px-4 rounded-md mb-4 flex items-center">
                <img src="https://cdn-icons-png.flaticon.com/128/15236/15236032.png" alt="Sign Up Icon" className="h-6 w-6 mr-2" />
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <button onClick={onLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mb-4 flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/128/1828/1828665.png" alt="Log Out Icon" className="h-6 w-6 mr-2" />
            Log Out
          </button>
        )}
        <Link to="/aboutus">
          <button className={`bg-cyan-500 hover:bg-cyan-700 text-black dark:text-white font-bold py-2 px-4 rounded-md mb-4 flex items-center ${darkMode ? 'hover:bg-cyan-600' : ''}`}>
            <img src="https://cdn-icons-png.flaticon.com/128/189/189664.png" alt="About Us Icon" className="h-6 w-6 mr-2" />
            About Us
          </button>
        </Link>
        <Link to="/contactus">
          <button className={`bg-red-500 hover:bg-red-700 text-black dark:text-white font-bold py-2 px-4 rounded-md mb-4 flex items-center ${darkMode ? 'hover:bg-red-600' : ''}`}>
            <img src="https://cdn-icons-png.flaticon.com/128/3095/3095583.png" alt="Contact Us Icon" className="h-6 w-6 mr-2" />
            Contact Us
          </button>
        </Link>
        <button onClick={onToggleTheme} className={`bg-gray-500 hover:bg-gray-700 text-black dark:text-white font-bold py-2 px-4 rounded-md mb-4 flex items-center ${darkMode ? 'hover:bg-gray-600' : ''}`}>
          <img src="https://cdn-icons-png.flaticon.com/128/3171/3171807.png" alt="Toggle Theme Icon" className="h-6 w-6 mr-2" />
          Light
        </button>
      </div>
    </nav>
  );
}

export default Sidebar;
