import React from 'react';

const ScorePopup = ({ score, totalQuestions, onClose }) => {
    const passingScore = 10; // Define the minimum passing score

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    Exam {score >= passingScore ? 'Passed' : 'Failed'}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    Your Score: {score} / {totalQuestions}
                </p>
                <p className={`text-lg mt-2 ${score >= passingScore ? 'text-green-500' : 'text-red-500'}`}>
                    {score >= passingScore ? 'Congratulations! You passed the exam.' : 'Sorry, you did not pass. Try again!'}
                </p>
                <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ScorePopup;
