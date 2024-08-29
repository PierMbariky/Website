
import React, { useState } from 'react';
import { handleFormChange, handleFormSubmit } from '../functionality/contactFormFunctions'; // Import contact functions
import { sendContactData } from '../api/contactApi'; // Import API function

function ContactUs() {
    // State for managing form data
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    // State for managing error messages

  const [error, setError] = useState('');
    // State for managing submission success status

  const [submitSuccess, setSubmitSuccess] = useState(false);
  // Handle changes in form fields

  const handleChange = (event) => handleFormChange(event, formData, setFormData);
    // Handle form submission

  const handleSubmit = (event) => handleFormSubmit(event, formData, setError, setSubmitSuccess, setFormData, sendContactData);
// This page displays a contact form where users can submit their inquiries or feedback.
  // It includes fields for name, email, and message, and handles form submission and validation.
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-lg mb-8 text-center">
          Have any questions or feedback? We'd love to hear from you! Please fill out the form below or reach out to us through our social media channels.
        </p>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg mb-8">
          <form onSubmit={handleSubmit}>
            {/* Form Fields */}
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
                placeholder="Your email"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
                rows="5"
                placeholder="Your message"
              ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
              Send
            </button>
            {submitSuccess && <p className="text-green-500 text-sm mt-2">Message sent successfully!</p>}
          </form>
        </div>
        {/* Social Media Links */}
        <div className="flex justify-center space-x-4">
          {/* Icons and links */}
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
