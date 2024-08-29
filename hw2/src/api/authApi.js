// Import the ipAddress variable from the App component
import { ipAddress } from '../App';
// Define an asynchronous function to handle user login
export const loginUser = async (email, password) => {
  // Send a POST request to the login API endpoint with the user's email and password
  const response = await fetch(`${ipAddress}api/login`, {
    method: 'POST', // Specify the HTTP method as POST
    headers: {
      'Content-Type': 'application/json',// Set the content type to JSON
    },
    body: JSON.stringify({ email, password }), // Convert the email and password to a JSON string for the request body
  });
  // Parse the response from the server as JSON
  const data = await response.json();
  // Return an object containing the parsed data and a boolean indicating if the request was successful
  return { data, ok: response.ok };
};