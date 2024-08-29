// Import the ipAddress variable from the App component
import { ipAddress } from '../App';

// Define an asynchronous function to fetch a list of courses from the server
export const fetchCourses = async () => {
    try {
        // Send a GET request to the courses API endpoint
        const response = await fetch(`${ipAddress}api/courses`);
        // Parse and return the response data as JSON
        return await response.json();
    } catch (error) {
        // Throw an error with a custom message if the request fails
        throw new Error('Error fetching courses: ' + error.message);
    }
};
// Define an asynchronous function to fetch a list of units for a specific course
export const fetchUnits = async (courseId) => {
    try {
        // Send a GET request to the units API endpoint using the courseId
        const response = await fetch(`${ipAddress}api/courses/${courseId}/units`);
        // Parse and return the response data as JSON

        return await response.json();
    } catch (error) {
        // Throw an error with a custom message if the request fails
        throw new Error('Error fetching units: ' + error.message);
    }
};
// Define an asynchronous function to fetch a list of lessons for a specific unit
export const fetchLessons = async (unitId) => {
    try {
        // Send a GET request to the lessons API endpoint using the unitId

        const response = await fetch(`${ipAddress}api/units/${unitId}/lessons`);
        return await response.json();
    } catch (error) {
        // Throw an error with a custom message if the request fails

        throw new Error('Error fetching lessons: ' + error.message);
    }
};
// Define an asynchronous function to fetch the progress of lessons for a specific user and unit

export const fetchProgress = async (email, unitId) => {
    try {
        // Send a GET request to the progress API endpoint using the user's email and unitId

        const response = await fetch(`${ipAddress}api/users/${email}/units/${unitId}/lessonsprogress`);
        // Parse and return the response data as JSON
        return await response.json();
    } catch (error) {
        // Throw an error with a custom message if the request fails

        throw new Error('Error fetching progress: ' + error.message);
    }
};
