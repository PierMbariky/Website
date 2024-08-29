import { loginUser } from '../api/authApi'; // Import the loginUser function

// Function to handle the login form submission
export const handleLoginSubmit = async (event, email, password, setError, navigate, onLogin) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Check if email and password fields are filled
  if (!email || !password) {
    setError('Please fill in all fields'); // Set error message if fields are empty
    return;
  }

  try {
    // Use the loginUser function to perform the login
    const { data, ok } = await loginUser(email, password);

    if (ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      onLogin(data.user);
      navigate('/home');
    } else {
      setError(data.error);
    }
  } catch (error) {
    console.error('Error during login:', error);
    setError('An error occurred');
  }
};
