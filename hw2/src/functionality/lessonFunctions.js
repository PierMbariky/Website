import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import VideoPopup from '../components/VideoPopup';
import ScorePopup from '../components/ScorePopup';
import { fetchQuestions, markLessonAsCompleted } from '../api/lessonApi';

export const lessonFunctions = () => {
    const { lessonId, unitId } = useParams(); // Get lessonId and unitId from the URL parameters
    const navigate = useNavigate(); // Hook for navigation
    const location = useLocation(); // Hook to access location state
    const [questions, setQuestions] = useState([]); // State to store the list of questions
    const [currentQuestion, setCurrentQuestion] = useState(0); // State to track the current question index
    const [userAnswer, setUserAnswer] = useState(''); // State to store the user's answer
    const [isCorrect, setIsCorrect] = useState(false); // State to track if the user's answer is correct
    const [timeLeft, setTimeLeft] = useState(600); // State to manage the exam timer (default 10 minutes)
    const [showPopup, setShowPopup] = useState(true); // State to control the visibility of the video popup
    const [showExamInfo, setShowExamInfo] = useState(false); // State to control the visibility of the exam instructions popup
    const [showScorePopup, setShowScorePopup] = useState(false); // State to control the visibility of the score popup
    const [score, setScore] = useState(0); // State to store the user's score
    const user = JSON.parse(localStorage.getItem('user')) || {}; // Get user data from local storage
    const email = user.email || ''; // Get user's email from local storage data
    const isExam = location.state?.exam; // Check if the current lesson is an exam based on location state
    const videoUrl = location.state?.videoUrl; // Get the video URL from location state

    // Fetch questions when lessonId changes
    useEffect(() => {
        if (lessonId) {
            fetchQuestions(lessonId)
                .then(setQuestions) // Update the questions state with the fetched data
                .catch((error) => console.error('Error fetching questions:', error)); // Log any errors
        }
    }, [lessonId]);

    // Show exam info popup if it's an exam
    useEffect(() => {
        if (isExam) {
            setShowExamInfo(true);
        }
    }, [isExam]);

    // Start the exam timer if it's an exam and instructions are closed
    useEffect(() => {
        if (isExam && !showExamInfo) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timer); // Stop the timer if time runs out
                        failExam(); // Handle exam failure due to timeout
                        return 0;
                    }
                    return prevTime - 1; // Decrease time left by 1 second
                });
            }, 1000);

            return () => clearInterval(timer); // Clean up the timer when component unmounts
        }
    }, [isExam, showExamInfo]);

    // Function to format the YouTube video URL for embedding
    const formatVideoUrl = (url) => {
        console.log(url);
        if (url.includes('youtube.com/watch')) {
            const videoId = new URL(url).searchParams.get('v');
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    };

    // Handle user answer selection
    const handleAnswer = (answer) => {
        const answerString = Array.isArray(answer) ? answer[0] : answer; // Ensure the answer is a string
        if (typeof answerString === 'string') {
            const updatedQuestions = [...questions];
            updatedQuestions[currentQuestion].userAnswer = answerString; // Store the user's answer 
            setQuestions(updatedQuestions);

            setUserAnswer(answerString);
            checkAnswer(answerString); // Check if the answer is correct

            if (isExam) { 
                setTimeout(() => {
                    if (currentQuestion + 1 === updatedQuestions.length) {
                        showExamResults(); // Show results if it's the last question
                    } else {
                        setCurrentQuestion(currentQuestion + 1); // Move to the next question
                        setIsCorrect(false);
                        setUserAnswer('');
                    }
                }, 500); // Wait 0.5 seconds before moving to the next question
            }
        } else {
            console.error('Answer is not a string:', answer);
            setIsCorrect(false);
        }
    };

    // Check if the user's answer is correct
    const checkAnswer = (answer) => {
        const formattedAnswer = answer.trim().toLowerCase(); // Format the user's answer
        const formattedCorrectAnswer = questions[currentQuestion].correct_answer.trim().toLowerCase(); // Format the correct answer
        setIsCorrect(formattedAnswer === formattedCorrectAnswer); // Compare the answers
    };

    // Move to the next question or mark lesson as completed
    const handleNextQuestion = () => {
        if (isCorrect) {
            if (currentQuestion + 1 === questions.length) {
                if (email) {
                    // User is logged in, mark lesson as completed
                    markLessonAsCompleted(lessonId, unitId, email)
                        .then(() => navigate('/learn'))
                        .catch((error) => console.error('Error marking lesson as completed:', error));
                } else {
                    // User is not logged in, save lesson completion status to local storage
                    const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
                    if (!completedLessons.find(l => l.lessonId === lessonId && l.unitId === unitId)) {
                        completedLessons.push({ unitId, lessonId });
                        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
                    }
                    navigate('/learn');
                }
            } else {
                setCurrentQuestion(currentQuestion + 1);
                setIsCorrect(false);
                setUserAnswer('');
            }
        }
    };

    // Handle exam failure due to timeout
    const failExam = () => {
        console.error('Exam failed due to time running out.');
        navigate('/learn'); // Navigate back to the learning page
    };

    // Format time in minutes and seconds
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`; // Format time as mm:ss
    };

    const showExamResults = () => {
        let correctAnswers = 0;
    
        questions.forEach((q) => {
            const formattedUserAnswer = (q.userAnswer || '').trim().toLowerCase();
            const formattedCorrectAnswer = q.correct_answer.trim().toLowerCase();
            if (formattedUserAnswer === formattedCorrectAnswer) {
                correctAnswers++;
            }
        });
    
        setScore(correctAnswers);
        setShowScorePopup(true);
    
        setTimeout(() => {
            if (correctAnswers < 10) {
                failExam();
            } else {
                if (email) {
                    markLessonAsCompleted(lessonId, unitId, email)
                        .then(() => navigate('/learn'))
                        .catch((error) => console.error('Error marking lesson as completed:', error));
                } else {
                    const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
                    if (!completedLessons.find(l => l.lessonId === lessonId && l.unitId === unitId)) {
                        completedLessons.push({ unitId, lessonId });
                        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
                    }
                    navigate('/learn');
                }
            }
        }, 3000);
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
        navigate('/learn'); 
    };

    // Check local storage for completed lessons on component mount
    useEffect(() => {
        if (!email && lessonId) {
            const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
            if (completedLessons.includes(lessonId)) {
                // If the lesson is found in local storage, mark it as completed
                markLessonAsCompleted(lessonId, unitId, email)
                    .then(() => console.log('Lesson marked as completed from local storage.'))
                    .catch((error) => console.error('Error marking lesson as completed from local storage:', error));
            }
        }
    }, [lessonId, unitId, email]);

    return {
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
    }; 
};
