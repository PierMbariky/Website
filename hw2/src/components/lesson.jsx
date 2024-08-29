import React from 'react';
import { Link } from 'react-router-dom';
// Lesson component displays a lesson item with visual feedback for completion and lock status

const Lesson = ({ lesson, completed, isLocked }) => {
    // Check if the lesson is an exam

  const isExam = lesson.title.toLowerCase() === 'exam';
    // Retrieve the video URL for the lesson

  const videoUrl = lesson.videoUrl;

  return (
    <div className="flex justify-center mb-6">
      {isLocked ? (
        <div
          className="bg-gray-400 cursor-not-allowed rounded-full shadow-lg p-6 w-28 h-28 flex flex-col justify-center items-center relative transition-transform transform hover:scale-105"
        >
          <div className="text-lg font-semibold text-white text-center">{lesson.title}</div>
        </div>
      ) : (
        <Link
          to={`/Lessonspage/${lesson.unitid}/${lesson.id}`}
          state={{
            exam: lesson.title === 'Exam',
            videoUrl: videoUrl,
          }}
          className={`relative rounded-full shadow-xl p-6 w-28 h-28 flex flex-col justify-center items-center transition-transform transform hover:scale-105 ${
            completed
              ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
              : 'bg-gradient-to-r from-red-500 to-red-700 text-white '
          }`}
        >
          <div className="text-lg font-semibold text-white text-center">{lesson.title}</div>
          {completed && (
            <svg
              className="w-6 h-6 text-green-900 absolute bottom-0.5 center "
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