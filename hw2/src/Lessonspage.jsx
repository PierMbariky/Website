import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ipAddress } from './App';

const LessonPages = () => {
    const { lessonId, unitId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const email = user.email || '';
    const isExam = location.state.exam;

    useEffect(() => {
        if (lessonId) {
            fetchQuestions(lessonId);
        }
    }, [lessonId]);

    useEffect(() => {
        console.log(location.state);
        if (isExam) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 0) {
                        clearInterval(timer);
                        failExam();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isExam]);

    const fetchQuestions = (lessonId) => {
        fetch(`${ipAddress}/api/lessons/${lessonId}/questions`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setQuestions(data.questions);
                } else {
                    console.error('Failed to fetch questions:', data.error);
                }
            })
            .catch(error => console.error('Error fetching questions:', error));
    };

    const handleAnswer = (answer) => {
        const answerString = Array.isArray(answer) ? answer[0] : answer;
        if (typeof answerString === 'string') {
            setUserAnswer(answerString);
            checkAnswer(answerString);
        } else {
            console.error('Answer is not a string:', answer);
            setIsCorrect(false);
        }
    };

    const checkAnswer = (answer) => {
        const formattedAnswer = answer.trim().toLowerCase();
        const formattedCorrectAnswer = questions[currentQuestion].correct_answer.trim().toLowerCase();
        setIsCorrect(formattedAnswer === formattedCorrectAnswer);
    };

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

    const markLessonAsCompleted = () => {
        if (email) {
            fetch(`${ipAddress}/api/lessons/${lessonId}/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ unitId, lessonId, email }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        navigate('/learn');
                    } else {
                        console.error('Failed to mark lesson as completed:', data.error);
                    }
                })
                .catch(error => console.error('Error marking lesson as completed:', error));
        } else {
            const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
            completedLessons.push({ unitId, lessonId });
            localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
            navigate('/learn');
        }
    };

    const failExam = () => {
        console.error('Exam failed due to time running out.');
        navigate('/learn'); // Redirect to the learn page on failure
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

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
                    {questions[currentQuestion].description && (
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
                    {isCorrect && (
                        <button
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded text-lg mt-6"
                            onClick={handleNextQuestion}
                        >
                            {currentQuestion + 1 === questions.length ? 'Finish Lesson' : 'Next Question'}
                        </button>
                    )}
                    {!isCorrect && userAnswer !== '' && (
                        <p className="text-red-500 mt-6 text-lg">Incorrect answer, try again!</p>
                    )}
                    <div className="flex justify-between w-full mt-6 text-lg">
                        <p className="text-gray-600 dark:text-gray-400">
                            Question {currentQuestion + 1} of {questions.length}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Score: {currentQuestion} / {questions.length}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LessonPages;
