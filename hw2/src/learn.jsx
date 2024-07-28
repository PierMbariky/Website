import React, { useState, useEffect } from 'react';
import { ipAddress } from './App';
import Unit from './components/unit';
import Lesson from './components/lesson'; // Ensure this component is properly defined
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Learn() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [units, setUnits] = useState([]);
  const [showUnits, setShowUnits] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [showLessons, setShowLessons] = useState(false);
  const [completedLessons, setCompletedLessons] = useState({}); // Track completed lessons
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetch(`${ipAddress}/api/courses`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setCourses(data.courses);
        } else {
          console.error('Failed to fetch courses:', data.error);
        }
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    fetchUnits(course.courseId);
    setShowUnits(true);
  };

  const fetchUnits = (courseId) => {
    fetch(`${ipAddress}/api/courses/${courseId}/units`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUnits(data.units);
        } else {
          console.error('Failed to fetch units:', data.error);
        }
      })
      .catch(error => console.error('Error fetching units:', error));
  };

  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
    fetchLessons(unit.id);
    setShowLessons(true);
  };

  const fetchLessons = (unitId) => {
    fetch(`${ipAddress}/api/units/${unitId}/lessons`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setLessons(data.lessons);
          // Update completed lessons status
          const completed = data.lessons.reduce((acc, lesson) => {
            acc[lesson.id] = lesson.completed;
            return acc;
          }, {});
          setCompletedLessons(completed);
        } else {
          console.error('Failed to fetch lessons:', data.error);
        }
      })
      .catch(error => console.error('Error fetching lessons:', error));
  };

  const handleLessonCompletion = (lessonId) => {
    // Update completion status locally
    setCompletedLessons(prev => ({ ...prev, [lessonId]: true }));
  };

  const handleBack = () => {
    setShowUnits(false);
    setShowLessons(false);
    setSelectedCourse(null);
    setSelectedUnit(null);
  };

  return (
    <div className="flex flex-col dark:text-gray-100 items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      {showLessons ? (
        <div className="mt-8 w-full max-w-6xl">
          <h2 className="text-2xl font-bold mb-4">Lessons</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {lessons.map((lesson, index) => (
              <Lesson
                key={index}
                lesson={lesson}
                completed={completedLessons[lesson.id]}
              />
            ))}
          </div>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleBack}
          >
            Back to units
          </button>
        </div>
      ) : showUnits ? (
        <div className="mt-8 w-full max-w-6xl">
          <h2 className="text-2xl font-bold mb-4">Units</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {units.map((unit, index) => (
              <Unit
                key={index}
                unit={unit}
                onClick={() => handleUnitSelect(unit)}
              />
            ))}
          </div>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleBack}
          >
            Back to courses
          </button>
        </div>
      ) : (
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {courses.map((item, index) => (
              <div key={index} className="p-4">
                <div className="bg-white dark:bg-gray-800 rounded shadow-md p-4 flex flex-col items-center">
                  <h2 className="text-xl font-bold mb-4 text-center">{item.name}</h2>
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
