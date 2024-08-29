
// Function to handle changes in the contact form inputs
// Updates the form data state whenever a user types in a form field
export const handleFormChange = (event, formData, setFormData) => {
  // Use the event's target id to update the corresponding field in the form data

  setFormData({ ...formData, [event.target.id]: event.target.value });
};
// Function to handle form submission
// Validates the form data, sends it to the server, and manages the form's state based on the response
export const handleFormSubmit = async (event, formData, setError, setSubmitSuccess, setFormData, sendContactData) => {
  event.preventDefault();
  setError(''); // Clear previous errors
  setSubmitSuccess(false);// Reset submission success status

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    setError('Please enter a valid email address.'); // Set an error if the email format is invalid
    return;// Stop further execution if the email is invalid
  }

  try {
    // Attempt to send the form data to the server
    const response = await sendContactData(formData);
    if (response.ok) {
      // If the server response is successful, update the submission status and reset the form

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' }); // Clear form after successful submission
    } else {
      // If the server response indicates an error, parse the error message
      const data = await response.json();
      setError(data.error || 'An error occurred');// Display the error message or a default message
    }
  } catch (error) {
    // Handle any unexpected errors that occur during the form submission

    console.error('Error submitting form:', error);
    setError('An error occurred');// Display a generic error message
  }
};
