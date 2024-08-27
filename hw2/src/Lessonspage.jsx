import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ipAddress } from './App';
import VideoPopup from './components/VideoPopup';
import ScorePopup from './components/ScorePopup'; // Import the ScorePopup component

const LessonPages = () => {
    // Access route parameters and navigation
    const { lessonId, unitId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600);
    const [showPopup, setShowPopup] = useState(true);
    const [showExamInfo, setShowExamInfo] = useState(false);
    const [showScorePopup, setShowScorePopup] = useState(false); // State to show or hide score popup
    const [score, setScore] = useState(0); // State to store the user's score
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const email = user.email || '';
    const isExam = location.state?.exam;
    const videoUrl = location.state?.videoUrl;

    // Function to format the YouTube video URL for embedding
    const formatVideoUrl = (url) => {
        console.log(url);
        if (url.includes('youtube.com/watch')) {
            const videoId = new URL(url).searchParams.get('v');
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    };

    // Fetch questions when lessonId changes
    useEffect(() => {
        if (lessonId) {
            fetchQuestions(lessonId);
        }
    }, [lessonId]);

    // Show exam info if it's an exam
    useEffect(() => {
        if (isExam) {
            setShowExamInfo(true);
        }
    }, [isExam]);

    // Start exam timer if it's an exam and instructions are closed
    useEffect(() => {
        if (isExam && !showExamInfo) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timer);
                        failExam(); // Handle exam failure
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer); // Cleanup on unmount
        }
    }, [isExam, showExamInfo]);

    // Fetch questions from the API
    const fetchQuestions = (lessonId) => {
        fetch(`${ipAddress}api/lessons/${lessonId}/questions`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setQuestions(data.questions);
                } else {
                    console.error('Failed to fetch questions:', data.error);
                }
            })
            .catch((error) => console.error('Error fetching questions:', error));
    };

    // Handle user answer selection
    const handleAnswer = (answer) => {
        const answerString = Array.isArray(answer) ? answer[0] : answer;
        if (typeof answerString === 'string') {
            const updatedQuestions = [...questions];
            updatedQuestions[currentQuestion].userAnswer = answerString; // Store user's answer
            setQuestions(updatedQuestions);

            setUserAnswer(answerString);
            checkAnswer(answerString);

            if (isExam) { // Auto-advance to next question in exam mode
                setTimeout(() => {
                    if (currentQuestion + 1 === updatedQuestions.length) {
                        showExamResults(); // Show exam results if it's the last question
                    } else {
                        setCurrentQuestion(currentQuestion + 1);
                        setIsCorrect(false);
                        setUserAnswer('');
                    }
                }, 500);
            }
        } else {
            console.error('Answer is not a string:', answer);
            setIsCorrect(false);
        }
    };

    // Check if the user's answer is correct
    const checkAnswer = (answer) => {
        const formattedAnswer = answer.trim().toLowerCase();
        const formattedCorrectAnswer = questions[currentQuestion].correct_answer.trim().toLowerCase();
        setIsCorrect(formattedAnswer === formattedCorrectAnswer);
    };

    // Move to the next question or mark lesson as completed
    const handleNextQuestion = () => {
        if (isCorrect) {
            if (currentQuestion + 1 === questions.length) {
                markLessonAsCompleted();
            } else {
                setCurrentQuestion(currentQuestion + 1);
                setIsCorrect(false);
                setUserAnswer('');
            }
        }
    };

    // Mark the current lesson as completed
    const markLessonAsCompleted = () => {
        if (email) { // If user is logged in, update on server
            fetch(`${ipAddress}api/lessons/${lessonId}/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ unitId, lessonId, email }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        navigate('/learn');
                    } else {
                        console.error('Failed to mark lesson as completed:', data.error);
                    }
                })
                .catch((error) => console.error('Error marking lesson as completed:', error));
        } else { // If not logged in, store in local storage
            const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
            completedLessons.push({ unitId, lessonId });
            localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
            navigate('/learn');
        }
    };

    // Handle exam failure due to timeout
    const failExam = () => {
        console.error('Exam failed due to time running out.');
        navigate('/learn');
    };

    // Format time in minutes and seconds
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const showExamResults = () => {
        let correctAnswers = 0;

        // Loop through each question and check if the user's answer matches the correct answer
        questions.forEach((q, i) => {
            const formattedUserAnswer = (q.userAnswer || '').trim().toLowerCase(); // Assuming each question has a userAnswer property
            const formattedCorrectAnswer = q.correct_answer.trim().toLowerCase();
            if (formattedUserAnswer === formattedCorrectAnswer) {
                correctAnswers++;
            }
        });

        setScore(correctAnswers); // Set the user's score
        setShowScorePopup(true); // Show the score popup

        // Check if the user passed or failed
        if (correctAnswers < 10) {
            setTimeout(() => {
                navigate('/learn');
            }, 3000); // Redirect to learn page after 3 seconds
        } else {
            setTimeout(() => {
                markLessonAsCompleted();
            }, 3000); // Mark lesson as completed after 3 seconds
        }
    };

    // Close video popup
    const handlePopupClose = () => {
        setShowPopup(false);
    };

    // Close exam instructions and start the exam
    const handleExamInfoClose = () => {
        setShowExamInfo(false);
    };

    // Close score popup
    const handleScorePopupClose = () => {
        setShowScorePopup(false);
        navigate('/learn'); // Redirect to learn page after closing popup
    };

    // Render nothing if the popup is shown
    if (showPopup && videoUrl) {
        return <VideoPopup videoUrl={formatVideoUrl(videoUrl)} onClose={handlePopupClose} />;
    }

    // Render exam instructions if needed
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
            )}
        </div>
    );
};

export default LessonPages;
