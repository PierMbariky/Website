// src/components/Learn.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses, getUnits, getLessons } from '../functionality/learnFunctions';
import Unit from './unit';
import Lesson from './lesson';

function Learn() {
    // Initialize state variables

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [units, setUnits] = useState([]);
    const [showUnits, setShowUnits] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [lessons, setLessons] = useState({});
    const [showLessons, setShowLessons] = useState(false);
    // Use navigate hook to programmatically navigate

    const navigate = useNavigate();
    // Get user email from localStorage

    const userJson = localStorage.getItem('user');
    const email = userJson ? JSON.parse(userJson).email : null;
    // Fetch courses when component mounts

    useEffect(() => {
        getCourses(setCourses);
    }, []);
    // Handle course selection

    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
        getUnits(course.courseId, setUnits);
        setShowUnits(true);
    };
    // Handle unit selection

    const handleUnitSelect = (unit) => {
        setSelectedUnit(unit);
        getLessons(unit.id, email, setLessons);
        setShowLessons(true);
    };
    // Handle lesson click and navigate to the lesson detail page

    const handleLessonClick = (lessonData) => {
        navigate(`/lesson/${lessonData.lesson.id}`, {
            state: {
                exam: lessonData.lesson.title === 'Exam',
                videoUrl: lessonData.lesson.videoUrl,
            },
        });
    };
    // Handle navigation back to the previous view (units or courses)

    const handleBack = () => {
        setShowUnits(false);
        setShowLessons(false);
        setSelectedCourse(null);
        setSelectedUnit(null);
    };
    // Render the Learn page, which includes:
    // - A section displaying lessons if a unit is selected.
    // - A section displaying units if a course is selected.
    // - A section displaying courses if neither a unit nor a course is selected.
    // - Navigation buttons to go back to the previous view and to select courses/units/lessons.
    // The layout is responsive and adapts to different screen sizes.

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 dark:bg-gray-900 p-4 pt-48">
            {showLessons ? (
                <div className="mt-8 w-full max-w-6xl justify-center">
                    <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">Lessons</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {Object.values(lessons).map((lessonData) => {
                            const isExam = lessonData.lesson.title === 'Exam';
                            const allOtherLessonsCompleted = Object.values(lessons).every(ld => ld.lesson.title === 'Exam' || ld.completed);
                            const isLocked = isExam && !allOtherLessonsCompleted;

                            return (
                                <Lesson
                                    key={lessonData.lesson.id}
                                    lesson={lessonData.lesson}
                                    completed={lessonData.completed}
                                    isLocked={isLocked}
                                    onClick={() => handleLessonClick(lessonData)}
                                />
                            );
                        })}
                    </div>
                    <button
                        className="bg-gray-300 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-500 dark:text-white text-gray-900 font-bold py-2 px-4 rounded-lg mt-4"
                        onClick={handleBack}
                    >
                        Back to units
                    </button>
                </div>
            ) : showUnits ? (
                <div className="mt-8 w-full max-w-6xl">
                    <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">Units</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {units.map((unit) => (
                            <Unit
                                key={unit.id}
                                unit={unit}
                                onClick={() => handleUnitSelect(unit)}
                            />
                        ))}
                    </div>
                    <button
                        className="bg-gray-300 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-500 dark:text-white text-gray-900 font-bold py-2 px-4 rounded-lg mt-4"
                        onClick={handleBack}
                    >
                        Back to courses
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-6xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {courses.map((item) => (
                            <div key={item.courseId} className="p-4">
                                <div className="bg-white dark:bg-gray-800 rounded shadow-md p-4 flex flex-col items-center">
                                    <h2 className="text-xl font-bold mb-4 text-center dark:text-white text-gray-900">{item.name}</h2>
                                    <img
                                        src={item.imagesrc}
                                        alt={item.name}
                                        className="w-full h-64 object-cover rounded cursor-pointer transition-transform duration-300 transform hover:scale-105"
                                        onClick={() => handleCourseSelect(item)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Learn;
