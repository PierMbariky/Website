// Import the ipAddress variable from the App component
import { ipAddress } from '../App';
// Define a function to fetch questions for a specific lesson
export const fetchQuestions = (lessonId) => {
    // Send a GET request to the questions API endpoint using the lessonId
    return fetch(`${ipAddress}api/lessons/${lessonId}/questions`)
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
            if (data.success) {
                // If the response indicates success, return the questions

                return data.questions;
            } else {
                // If the response indicates failure, throw an error with the error message

                throw new Error('Failed to fetch questions: ' + data.error);
            }
        });
};
// Define a function to mark a lesson as completed for a specific user and unit

export const markLessonAsCompleted = (lessonId, unitId, email) => {
    // Send a POST request to the lesson completion API endpoint

    return fetch(`${ipAddress}api/lessons/${lessonId}/complete`, {
        method: 'POST',// Specify the HTTP method as POST
        headers: {
            'Content-Type': 'application/json',// Set the content type to JSON
        },
        body: JSON.stringify({ unitId, lessonId, email }),// Convert the unitId, lessonId, and email to a JSON string for the request body
    })
        .then((response) => response.json())// Parse the response as JSON
        .then((data) => {
            if (data.success) {
                // If the response indicates success, return true to indicate the lesson was marked as completed

                return true;
            } else {
                // If the response indicates failure, throw an error with the error message

                throw new Error('Failed to mark lesson as completed: ' + data.error);
            }
        });
};