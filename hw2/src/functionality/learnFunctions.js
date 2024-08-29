import { fetchCourses, fetchUnits, fetchLessons, fetchProgress } from '../api/learnApi';
// Function to get courses from the server and update the state
export const getCourses = async (setCourses) => {
    try {
        // Fetch the list of courses using the API call

        const data = await fetchCourses();
        if (data.success) {
            // If the request is successful, update the courses state

            setCourses(data.courses);
        } else {
            // Log an error message if the API response indicates failure

            console.error('Failed to fetch courses:', data.error);
        }
    } catch (error) {
        console.error(error.message);
    }
};
// Function to get units for a specific course and update the state

export const getUnits = async (courseId, setUnits) => {
    try {
        // Fetch the list of units for a given course using the API call

        const data = await fetchUnits(courseId);
        if (data.success) {
            // If the request is successful, update the units state

            setUnits(data.units);
        } else {
            // Log an error message if the API response indicates failure

            console.error('Failed to fetch units:', data.error);
        }
    } catch (error) {
        // Log any errors that occur during the request

        console.error(error.message);
    }
};
// Function to get lessons for a specific unit and update the state
// This function also checks the user's progress and marks completed lessons accordingly
export const getLessons = async (unitId, email, setLessons) => {
    try {
        const lessonsData = await fetchLessons(unitId);
        if (!lessonsData.success) {
            throw new Error('Failed to fetch lessons: ' + lessonsData.error);
        }

        const lessonObject = {};
        lessonsData.lessons.forEach(lesson => {
            lessonObject[lesson.id] = { lesson, completed: false };
        });

        if (email) {
            // Fetch user's progress if email is provided
            const progressData = await fetchProgress(email, unitId);
            if (!progressData.success) {
                throw new Error('Failed to fetch progress: ' + progressData.error);
            } else {
                progressData.completedLessons.forEach(progress => {
                    if (progress.completed) {
                        lessonObject[progress.lessonid].completed = true;
                    }
                });
            }
        } else {
            // If no email is provided, check local storage for completed lessons
            const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
            
            completedLessons.forEach(completedLesson => {
                if (completedLesson.unitId == unitId) {
                    lessonObject[completedLesson.lessonId].completed = true;
                }
            });
        }

        setLessons(lessonObject);
    } catch (error) {
        console.error(error.message);
    }
};