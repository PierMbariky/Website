// src/Functionality/signupFunctions.js
import { signupApi } from '../api/signupApi'; // Adjust the path if needed

export const handleSignup = async (userData, onUserUpdate, navigate) => {
    const { name, email, password, confirmPassword } = userData;

    // Basic validation for required fields and password match
    if (!name || !email || !password || password !== confirmPassword) {
        alert('Please fill all fields correctly.'); // Simple alert for now
        return;
    }

    try {
        // Send signup request to the server
        const data = await signupApi({ name, email, password });
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data
        onUserUpdate(data.user); // Update the user state in the parent component
        navigate('/home'); // Redirect after successful signup
    } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred. Please try again.');
    }
};
