import React, { useState, useEffect } from 'react';
import { ipAddress } from './App';
import Unit from './components/unit';
import Lesson from './components/lesson';
import { useNavigate } from 'react-router-dom';

function Learn() {
    // State variables to manage data and UI display
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [units, setUnits] = useState([]);
  const [showUnits, setShowUnits] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [lessons, setLessons] = useState({});
  const [showLessons, setShowLessons] = useState(false);
  const navigate = useNavigate();
  // Retrieve user email if available
  //to see if logged in
  const userJson = localStorage.getItem('user');
  let email = null;

  if (userJson) {
    const user = JSON.parse(userJson);
    email = user.email;
  }
  // Fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${ipAddress}api/courses`);
        const data = await response.json();
        if (data.success) {
          setCourses(data.courses);
        } else {
          console.error('Failed to fetch courses:', data.error);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);
  // Handle course selection
  //to see units
  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    fetchUnits(course.courseId);
    setShowUnits(true);
  };
  // Fetch units for a selected course

  const fetchUnits = async (courseId) => {
    try {
      const response = await fetch(`${ipAddress}api/courses/${courseId}/units`);
      const data = await response.json();
      if (data.success) {
        setUnits(data.units);
      } else {
        console.error('Failed to fetch units:', data.error);
      }
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };
  // Handle unit selection
  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
    fetchLessons(unit.id, email);
    setShowLessons(true);
  };
  // Fetch lessons for a selected unit
  const fetchLessons = async (unitId, email) => {
    try {
      const lessonsResponse = await fetch(`${ipAddress}api/units/${unitId}/lessons`);
      const lessonsData = await lessonsResponse.json();
      if (!lessonsData.success) {
        throw new Error('Failed to fetch lessons: ' + lessonsData.error);
      }
      console.log(lessonsData);
      const lessonObject = {};
      lessonsData.lessons.forEach(lesson => {
        lessonObject[lesson.id] = { lesson, completed: false };
      });
        // Fetch completed lessons if user is logged in
      if (email) {
        const progressResponse = await fetch(`${ipAddress}api/users/${email}/units/${unitId}/lessonsprogress`);
        const progressData = await progressResponse.json();
        if (!progressData.success) {
          throw new Error('Failed to fetch progress: ' + progressData.error);
        } else {
          progressData.completedLessons.forEach(progress => {
            if (progress.completed) {
              lessonObject[progress.lessonid].completed = true;
            }
          });
        }
      } else { // If not logged in, get completed lessons from local storage
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
  // Handle lesson click
  const handleLessonClick = (lessonData) => {
    navigate(`/lesson/${lessonData.lesson.id}`, {
      state: {
        exam: lessonData.lesson.title === 'Exam',
        videoUrl: lessonData.lesson.videoUrl, // Pass video URL
      },
    });
  };
  // Handle back button click
  const handleBack = () => {
    setShowUnits(false);
    setShowLessons(false);
    setSelectedCourse(null);
    setSelectedUnit(null);
  };
  // JSX to render the component based on current state
  return (
    <div className="flex flex-col dark:text-gray-100 items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      {showLessons ? (
        <div className="mt-8 w-full max-w-6xl">
          <h2 className="text-2xl font-bold mb-4">Lessons</h2>
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
                  onClick={() => handleLessonClick(lessonData)} // Handle lesson click
                />
                
              );
            })}
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
            {units.map((unit) => (
              <Unit
                key={unit.id}
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
            {courses.map((item) => (
              <div key={item.courseId} className="p-4">
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
