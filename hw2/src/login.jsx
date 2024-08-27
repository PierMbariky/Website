// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ipAddress } from './App';

const Login = ({ onLogin }) => {
    // State variables for email, password, and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
    // Navigation hook for redirection after successful login
  const navigate = useNavigate();
  // Handles form submission for login

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Basic input validation

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
            // Send login request to the server

      const response = await fetch(`${ipAddress}api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {// Successful login
                // Store user data in local storage
        localStorage.setItem('user', JSON.stringify(data.user));
                // Call onLogin prop (presumably to update app state)

        onLogin(data.user);
        navigate('/home'); // Redirect to protected area or dashboard
      } else {// Login failed
        setError(data.error);
      }
    } catch (error) {// Handle network or other errors
      console.error('Error during login:', error);
      setError('An error occurred');
    }
  };
  // JSX for the login form

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-4 pt-6 pb-8 mb-4 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Login</h1>
        {error && <div className="text-red-500">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="bg-blue-700 hover:bg-blue-900 dark:hover:bg-blue-900  dark:text-white text-gray-900 font-bold py-2 px-4 rounded">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
