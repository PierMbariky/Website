// components/LessonPage.jsx

import React from 'react';
import VideoPopup from './VideoPopup';
import ScorePopup from './ScorePopup';
import { lessonFunctions } from '../functionality/lessonFunctions';

const LessonsPage = () => {
    // Destructure various state variables and handlers from lessonFunctions

    const {
        showPopup,
        videoUrl,
        showExamInfo,
        isExam,
        timeLeft,
        questions,
        currentQuestion,
        userAnswer,
        isCorrect,
        showScorePopup,
        score,
        formatVideoUrl,
        handlePopupClose,
        handleExamInfoClose,
        handleScorePopupClose,
        handleAnswer,
        handleNextQuestion,
        formatTime
    } = lessonFunctions();

    // Render the video popup if it is shown
    if (showPopup && videoUrl) {
        return <VideoPopup videoUrl={formatVideoUrl(videoUrl)} onClose={handlePopupClose} />;
    }

    // Render the exam instructions if they are needed
    if (showExamInfo) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
                <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded shadow-md p-6 flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                        Exam Instructions
                    </h2>
                    <p className="text-lg mb-6">
                        You have 10 minutes to complete this exam.
                    </p>
                    <p className="text-lg mb-6">
                        You need to answer at least 10 questions correctly out of 15 to pass.
                    </p>
                    <button
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded text-lg"
                        onClick={handleExamInfoClose}
                    >
                        Start Exam
                    </button>
                </div>
            </div>
        );
    }
    // Render the main content of the lessons page if no popups are shown

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            {isExam && (
                <div className="text-red-500 font-bold text-2xl mb-4">
                    Time left: {formatTime(timeLeft)}
                </div>
            )}
            {questions.length > 0 && (
                <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded shadow-md p-6 flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                        {questions[currentQuestion].question}
                    </h2>
                    {!isExam && questions[currentQuestion].description && (
                        <img
                            src={questions[currentQuestion].description}
                            alt="Description GIF"
                            className="mb-6 rounded shadow-md"
                            style={{ width: '450px', height: '300px', objectFit: 'cover' }}
                        />
                    )}
                    <div className="flex flex-wrap gap-6 justify-center mb-6">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded text-lg ${userAnswer === option ? 'bg-green-500' : ''}`}
                                onClick={() => handleAnswer(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    {!isExam && isCorrect && (
                        <button
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded text-lg mt-6"
                            onClick={handleNextQuestion}
                        >
                            {currentQuestion + 1 === questions.length ? 'Finish Lesson' : 'Next Question'}
                        </button>
                    )}
                    {!isExam && !isCorrect && userAnswer !== '' && (
                        <p className="text-red-500 mt-6 text-lg">Incorrect answer, try again!</p>
                    )}
                    <div className="flex justify-between w-full mt-6 text-lg">
                        <p className="text-gray-600 dark:text-gray-400">
                            Question {currentQuestion + 1} of {questions.length}
                        </p>
                    </div>
                </div>
            )}
            {showScorePopup && (
                <ScorePopup score={score} totalQuestions={questions.length} onClose={handleScorePopupClose} />
            )}
        </div>
    );
};

export default LessonsPage;