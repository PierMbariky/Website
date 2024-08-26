import React from 'react';
import { Link } from 'react-router-dom';

  // Functional component representing a single lesson
const Lesson = ({ lesson, completed, isLocked }) => {
    // Check if the lesson is an exam based on its title
  const isExam = lesson.title.toLowerCase() === 'exam';
    // Extract the video URL from the lesson object
  const videoUrl = lesson.videoUrl;

  return (
    <div className="flex justify-center mb-4">
      {isLocked ? (
        <div
          className="bg-gray-400 cursor-not-allowed rounded-full shadow-md p-4 w-24 h-24 flex justify-center items-center relative"
        >
          <div className="text-lg font-bold text-white">{lesson.title}</div>
        </div>
      ) : (
                // If the lesson is unlocked
        <Link
          to={`/Lessonspage/${lesson.unitid}/${lesson.id}`}
          state={{ 
            exam: lesson.title === 'Exam',
            videoUrl: videoUrl // Pass videoUrl here
          }} 
          className={`relative rounded-full shadow-xl p-6 w-28 h-28 flex flex-col justify-center items-center transition-transform transform hover:scale-105 ${completed ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' : 'bg-gradient-to-r from-orange-400 to-orange-600 text-white dark:from-gray-700 dark:to-gray-800'}`}
        >
          <div className="text-lg font-bold text-white">{lesson.title}</div>
          {completed && (
            <svg
              className="w-6 h-6 text-red-900 absolute top-1 right-1 transform translate-x-1 translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </Link>
      )}
    </div>
  );
};

export default Lesson;