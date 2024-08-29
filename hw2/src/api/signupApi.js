// Import the ipAddress variable from the App component

import { ipAddress } from '../App';
// Define an asynchronous function to handle user signup

export const signupApi = async (userData) => {
    // Destructure the user data to extract name, email, and password

    const { name, email, password } = userData;

    try {
        // Send a POST request to the signup API endpoint with the user's name, email, and password

        const response = await fetch(`${ipAddress}api/signUp`, {
            method: 'POST',// Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json',// Set the content type to JSON
            },
            body: JSON.stringify({ name, email, password }), // Convert the user data to a JSON string for the request body
        });
        // If the response is not ok (e.g., status code is not 200-299), throw an error

        if (!response.ok) {

            const data = await response.json();
            // Throw an error with the message from the server or a default message
            throw new Error(data.message || 'An error occurred during signup.');
        }
        // If the response is ok, return the parsed response data

        return await response.json();
    } catch (error) {
        throw error;
    }
};
