import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  // Check if a user is logged in by inspecting localStorage
  const isLoggedIn = localStorage.getItem('user') !== null;
  // Render the Home page, which includes:
  // - A welcome message and introductory text.
  // - Conditional rendering of Sign Up and Log In buttons if the user is not logged in.
  // - Sections showcasing the features of the platform with interactive cards.
  // - A call-to-action button to start learning if the user is interested in exploring the platform.
  // The layout is responsive and adapts to different screen sizes.
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Playwise</h1>
        <p className="text-lg mb-8">
          Your ultimate platform for learning and fun. Join us and explore new skills today!
        </p>
        {!isLoggedIn && (
          <div className="flex justify-center space-x-4">
            <Link to="/signup">
              <button className="bg-blue-700 hover:bg-blue-900 dark:hover:bg-blue-900  dark:text-white text-gray-900 font-bold py-2 px-4 rounded-md">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-blue-700 hover:bg-blue-900 dark:hover:bg-blue-900  dark:text-white text-gray-900 font-bold py-2 px-4 rounded-md">
                Log In
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="mt-16">
        <h2 className="text-4xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Interactive Learning</h3>
            <p>Engage with interactive lessons and quizzes to enhance your knowledge.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Track Progress</h3>
            <p>Monitor your learning progress with our detailed tracking system.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Community Support</h3>
            <p>Join our community to get support and share your learning experiences.</p>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-4xl font-bold text-center mb-8">Get Started</h2>
        <div className="flex justify-center">
          <Link to="/learn">
            <button className="bg-blue-700 hover:bg-blue-900 dark:hover:bg-blue-900  dark:text-white text-gray-900 font-bold py-2 px-4 rounded-md">
              Start Learning
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
