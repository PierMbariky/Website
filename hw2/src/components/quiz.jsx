import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState('easy');
  const [username, setUsername] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios.get('questions.json')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleLevelChange = (level) => {
    setLevel(level);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleUsernameChange = (username) => {
    setUsername(username);
  };

  const handleSubmit = () => {
    axios.post('/api/leaderboard', {
      username,
      score,
    })
      .then(response => {
        setLeaderboard(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <h2 className="text-lg font-bold mb-2">Quiz App</h2>
      <p className="text-gray-700 text-base">
        Question {currentQuestion + 1} of {questions.length}
      </p>
      <p className="text-gray-700 text-base">{questions[currentQuestion].question}</p>
      <ul>
        {questions[currentQuestion].options.map((option, index) => (
          <li key={index}>
            <button
              className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      <p className="text-gray-700 text-base">Score: {score}</p>
      <p className="text-gray-700 text-base">Level: {level}</p>
      <div className="flex justify-between">
        <button
          className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
          onClick={() => handleLevelChange('easy')}
        >
          Easy
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
          onClick={() => handleLevelChange('medium')}
        >
          Medium
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
          onClick={() => handleLevelChange('hard')}
        >
          Hard
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
          onClick={() => handleLevelChange('challenging')}
        >
          Challenging
        </button>
      </div>
      <input
        type="text"
        value={username}
        onChange={(event) => handleUsernameChange(event.target.value)}
        placeholder="Enter your username"
        className="w-full p-2 rounded border border-gray-400"
      />
      <button
        className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <ul>
        {leaderboard.map((user, index) => (
          <li key={index}>
            <p className="text-gray-700 text-base">{user.username}: {user.score}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Quiz;