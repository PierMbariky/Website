import React from 'react';
import { Link } from 'react-router-dom';
// The Footer component provides navigation buttons for various sections of the app.
// It includes options for logging in, signing up, logging out, and navigating to different pages.
// This footer is designed to be fixed at the bottom of the screen and works best for mobile or small screens,
// ensuring easy access to key sections of the app without taking up too much screen space.
function Footer({ darkMode, onToggleTheme, user, onLogout }) {
  return (
    <footer className={`fixed bottom-0 left-0 w-full ${darkMode ? 'bg-gray-800 ' : 'bg-gray-100 '} p-4 shadow-lg flex justify-around`}>
      <Link to="/learn">
        <button className="py-2 px-4 rounded-md flex items-center">
          <img src="https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg" alt="Learn Icon" className="h-6 w-6" />
        </button>
      </Link>
      <Link to="/components/characters">
        <button className="py-2 px-4 rounded-md flex items-center">
          <img src="https://cdn-icons-png.flaticon.com/128/330/330530.png" alt="Letters Icon" className="h-6 w-6" />
        </button>
      </Link>
      {!user ? (
        <>
          <Link to="/login">
            <button className="py-2 px-4 rounded-md flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/14175/14175078.png" alt="Log In Icon" className="h-6 w-6" />
            </button>
          </Link>
          <Link to="/signup">
            <button className="py-2 px-4 rounded-md flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/128/15236/15236032.png" alt="Sign Up Icon" className="h-6 w-6" />
            </button>
          </Link>
        </>
      ) : (
        <button onClick={onLogout} className="py-2 px-4 rounded-md flex items-center">
          <img src="https://cdn-icons-png.flaticon.com/128/1348/1348448.png" alt="Log Out Icon" className="h-6 w-6" />
        </button>
      )}
      <Link to="/aboutus">
        <button className={`font-bold py-2 px-4 rounded-md flex items-center `}>
          <img src="https://cdn-icons-png.flaticon.com/128/189/189664.png" alt="About Us Icon" className="h-6 w-6" />
        </button>
      </Link>
      <Link to="/contactus">
        <button className={`ont-bold py-2 px-4 rounded-md flex items-center `}>
          <img src="https://cdn-icons-png.flaticon.com/128/3095/3095583.png" alt="Contact Us Icon" className="h-6 w-6" />
        </button>
      </Link>
      <button onClick={onToggleTheme} className={`py-2 px-4 rounded-md flex items-center `}>
        <img src="https://cdn-icons-png.flaticon.com/128/3171/3171807.png" alt="Toggle Theme Icon" className="h-6 w-6" />
      </button>
    </footer>
  );
}

export default Footer;
