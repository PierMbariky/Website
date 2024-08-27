import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ipAddress } from './App';

const SignupPage = ({ onUserUpdate }) => {
    // State variables for form inputs and navigation

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
// Handle form submission for signup
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Basic validation for required fields and password match

    if (!name || !email || !password || password !== confirmPassword) {
      alert('Please fill all fields correctly.'); // Simple alert for now, could be improved with more user-friendly feedback
      return;
    }

    const newUser = { name, email, password };// Create new user object
    try {
      // Send signup request to the server
      const response = await fetch(`${ipAddress}api/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {// Handle errors from the server
        const data = await response.json();
        alert(data.message || 'An error occurred during signup.');
        return;
      }

      const data = await response.json();// Get user data from successful response
      localStorage.setItem('user', JSON.stringify(data.user));// Store user data in local storage
      onUserUpdate(data.user); // Update the user state in the parent component (App.js)
      navigate('/home'); // Redirect to home page after successful signup
    } catch (error) {// Handle network or other errors
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again.');
    }
  };
  // JSX for the signup form
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-4 pt-6 pb-8 mb-4 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full p-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full p-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full p-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full p-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
              placeholder="Enter your password again"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
