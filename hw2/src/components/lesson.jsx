import React from 'react';
import { Link } from 'react-router-dom';

const Lesson = ({ lesson, completed }) => {
  return (
    <div className="flex justify-center mb-4">
      <Link to={`/lessonspage/${lesson.id}`} className="bg-orange-500 hover:bg-orange-700 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full shadow-md p-4 w-24 h-24 flex justify-center items-center cursor-pointer">
        <div className="text-lg font-bold">{lesson.id}</div>
        {completed && (
          <svg
            className="w-6 h-6 text-green-500"
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
    </div>
  );
};

export default Lesson;