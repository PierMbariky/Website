import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ darkMode, onToggleTheme, user, onLogout, isSlim }) {
  const buttonClasses = "w-full h-8 flex items-center justify-start rounded-md font-semibold mb-2";
  const iconClasses = "h-5 w-5 mr-2";

  // The Sidebar component renders a navigation menu with different sections.
  // It includes:
  // - A logo button linking to the home page.
  // - Navigation buttons for 'Learn', 'Letters', and other pages.
  // - Conditional rendering for 'Log In' and 'Sign Up' buttons if the user is not logged in.
  // - A 'Log Out' button if the user is logged in.
  // - A 'Toggle Theme' button to switch between dark and light modes.
  // - The sidebar's width can be slim or normal based on the `isSlim` prop.
  // - The sidebar's color scheme is adjusted based on the `darkMode` prop.
  return (
    <nav className={`fixed top-0 left-0 h-full ${isSlim ? 'w-16' : 'w-40'} ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} p-4 shadow-lg`}>
      <div className={`flex items-center mb-0 mt-5  `}>
        <Link to="/home">
          <button className={`hover:text-gray-700 dark:hover:text-white transition duration-300 ease-in-out ${buttonClasses}`}>
            <img src="https://cdn-icons-png.flaticon.com/128/3665/3665962.png" alt="playwize Icon" className={iconClasses} />
            <span className="hidden lg:inline text-xl font-bold">Playwise</span>
          </button>
        </Link>
      </div>
      <div className="flex flex-col mt-auto">
        <Link to="/learn">
          <button className={`hover:text-purple-700 ${buttonClasses}`}>
            <img src="https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg" alt="Learn Icon" className={iconClasses} />
            <span className="hidden lg:inline text-left">Learn</span>
          </button>
        </Link>
        <Link to="/components/characters">
          <button className={`hover:text-orange-700 ${buttonClasses}`}>
            <img src="https://cdn-icons-png.flaticon.com/128/330/330530.png" alt="Letters Icon" className={iconClasses} />
            <span className="hidden lg:inline text-left">Letters</span>
          </button>
        </Link>
        {!user ? (
          <>
            <Link to="/login">
              <button className={`hover:text-blue-700 ${buttonClasses}`}>
                <img src="https://cdn-icons-png.flaticon.com/512/14175/14175078.png" alt="Log In Icon" className={iconClasses} />
                <span className="hidden lg:inline text-left">Log In</span>
              </button>
            </Link>
            <Link to="/signup">
              <button className={`hover:text-pink-700 ${buttonClasses}`}>
                <img src="https://cdn-icons-png.flaticon.com/128/15236/15236032.png" alt="Sign Up Icon" className={iconClasses} />
                <span className="hidden lg:inline text-left">Sign Up</span>
              </button>
            </Link>
          </>
        ) : (
          <button onClick={onLogout} className={`hover:text-red-700 ${buttonClasses}`}>
            <img src="https://cdn-icons-png.flaticon.com/128/1348/1348448.png" alt="Log Out Icon" className={iconClasses} />
            <span className="hidden lg:inline text-left">Log Out</span>
          </button>
        )}
        <Link to="/aboutus">
          <button className={`hover:text-cyan-700 ${buttonClasses}`}>
            <img src="https://cdn-icons-png.flaticon.com/128/189/189664.png" alt="About Us Icon" className={iconClasses} />
            <span className="hidden lg:inline text-left">About Us</span>
          </button>
        </Link>
        <Link to="/contactus">
          <button className={`hover:text-red-700 ${buttonClasses}`}>
            <img src="https://cdn-icons-png.flaticon.com/128/3095/3095583.png" alt="Contact Us Icon" className={iconClasses} />
            <span className="hidden lg:inline text-left">Contact Us</span>
          </button>
        </Link>

        <button onClick={onToggleTheme} className={`hover:text-gray-700 ${buttonClasses}`}>
          <img src="https://cdn-icons-png.flaticon.com/128/3171/3171807.png" alt="Toggle Theme Icon" className={iconClasses} />
          <span className="hidden lg:inline text-left">Light</span>
        </button>
      </div>
    </nav>
  );
}

export default Sidebar;
