import React from 'react';
import { Link } from 'react-router-dom';

const Lesson = ({ lesson, completed, isLocked }) => {
  const isExam = lesson.title.toLowerCase() === 'exam';

  return (
    <div className="flex justify-center mb-4">
      {isLocked ? (
        <div
          className="bg-gray-400 cursor-not-allowed rounded-full shadow-md p-4 w-24 h-24 flex justify-center items-center relative"
        >
          <div className="text-lg font-bold text-white">{lesson.title}</div>
        </div>
      ) : (
        <Link
          to={`/Lessonspage/${lesson.unitid}/${lesson.id}`}
          state={{ exam: lesson.title=='Exam' }}  // Passing lesson title as state
          className={`bg-orange-500 hover:bg-orange-700 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full shadow-md p-4 w-24 h-24 flex justify-center items-center relative ${completed ? 'border-2 border-green-500' : ''}`}
        >
          <div className="text-lg font-bold text-white">{lesson.title}</div>
          {completed && (
            <svg
              className="w-6 h-6 text-green-500 absolute top-1 right-1 transform translate-x-1 translate-y-1"
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
