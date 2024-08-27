import React from 'react';

const ScorePopup = ({ score, totalQuestions, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    Exam Completed
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    Your Score: {score} / {totalQuestions}
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
