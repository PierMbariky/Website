import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { ipAddress } from './App';

const LessonPages = () => {
  const { lessonId } = useParams(); // Extract lessonId from URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (lessonId) { // Check if lessonId is valid
      fetchQuestions(lessonId);
    }
  }, [lessonId]);

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
    if (formattedAnswer === formattedCorrectAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    if (isCorrect) {
      if (currentQuestion + 1 === questions.length) {
        // Mark lesson as completed and navigate back
        markLessonAsCompleted();
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setIsCorrect(false);
        setUserAnswer('');
      }
    }
  };

  const markLessonAsCompleted = () => {
    fetch(`${ipAddress}/api/lessons/${lessonId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: true }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        navigate('/learn'); // Redirect to the lessons page
      } else {
        console.error('Failed to mark lesson as completed:', data.error);
      }
    })
    .catch(error => console.error('Error marking lesson as completed:', error));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      {questions.length > 0 && (
        <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded shadow-md p-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{questions[currentQuestion].question}</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded ${userAnswer === option ? 'bg-green-500' : ''}`}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {isCorrect && (
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleNextQuestion}
            >
              {currentQuestion + 1 === questions.length ? 'Finish Lesson' : 'Next Question'}
            </button>
          )}
          {!isCorrect && userAnswer !== '' && (
            <p className="text-red-500 mt-4">Incorrect answer, try again!</p>
          )}
          <div className="flex justify-between mt-4">
            <p className="text-gray-600 dark:text-gray-400">Question {currentQuestion + 1} of {questions.length}</p>
            <p className="text-gray-600 dark:text-gray-400">Score: {currentQuestion} / {questions.length}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonPages;
