// Import the ipAddress variable from the App component
import { ipAddress } from '../App';

// Define an asynchronous function to send contact form data to the server
export const sendContactData = async (formData) => {
  // Send a POST request to the contact API endpoint with the provided form data
  return fetch(`${ipAddress}api/contact`, {
    method: 'POST',// Specify the HTTP method as POST
    headers: {
      'Content-Type': 'application/json',// Set the content type to JSON
    },
    body: JSON.stringify(formData),// Convert the form data to a JSON string for the request body
  });
};
