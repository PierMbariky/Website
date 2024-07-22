// Header.js
import React from 'react';

function Header({ darkMode, onToggleTheme }) {
    console.log(onToggleTheme);
  return (
    <nav
      className={`flex justify-between h-16 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
      } dark:bg-gray-800`}
    >
      <div className="flex items-center pl-4">
        <ul className="flex items-center">
          <li>
            <a
              href="index.html"
              className="text-lg font-bold hover:text-gray-700 dark:hover:text-white transition duration-300 ease-in-out"
            >
              Playwise
            </a>
          </li>
          <li className="ml-2">
            <a
              href="aboutus.html"
              className={`text-black hover:text-gray-700 transition duration-300 ease-in-out dark:text-gray-400 dark:hover:text-gray-300`}
            >
              About us
            </a>
          </li>
          <li className="ml-2">
            <a
              href="contactus.html"
              className={`text-black hover:text-gray-700 transition duration-300 ease-in-out dark:text-gray-400 dark:hover:text-gray-300`}
            >
              Contact us
            </a>
          </li>
        </ul>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          className={`bg-gray-200 py-2 px-4 rounded-md ml-2 ${
            darkMode ? 'bg-gray-700 text-white' : ''
          } dark:bg-gray-800 dark:text-white`}
          placeholder="Enter code"
        />
        <button
          className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md ml-2 ${
            darkMode ? 'hover:bg-orange-600' : ''
          }`}
        >
          Join by code
        </button>
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-2 ${
            darkMode ? 'hover:bg-blue-600' : ''
          }`}
        >
          Log in
        </button>
        <button
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md ml-2 ${
            darkMode ? 'hover:bg-green-600' : ''
          }`}
        >
          Sign up
        </button>
        <button onClick={onToggleTheme} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md ml-2" id="theme-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12H9m3.293 4.293l-.707.707M11 16l2-2m0 0l2.293-2.293M22 4l-4.293 4.293" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Header;
