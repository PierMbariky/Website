import React from 'react';
// Array containing letters and their associated sound file paths
const letters = [
  { letter: 'א', sound: '/sound/א.mp3' },
  { letter: 'ב', sound: '/sound/ב.mp3' },
  { letter: 'ג', sound: '/sound/ג.mp3' },
  { letter: 'ד', sound: '/sound/ד.mp3' },
  { letter: 'ה', sound: '/sound/ה.mp3' },
  { letter: 'ו', sound: '/sound/ו.mp3' },
  { letter: 'ז', sound: '/sound/ז.mp3' },
  { letter: 'ח', sound: '/sound/ח.mp3' },
  { letter: 'ט', sound: '/sound/ט.mp3' },
  { letter: 'י', sound: '/sound/י.mp3' },
  { letter: 'כ', sound: '/sound/כ.mp3' },
  { letter: 'ל', sound: '/sound/ל.mp3' },
  { letter: 'מ', sound: '/sound/מ.mp3' },
  { letter: 'נ', sound: '/sound/נ.mp3' },
  { letter: 'ס', sound: '/sound/ס.mp3' },
  { letter: 'ע', sound: '/sound/ע.mp3' },
  { letter: 'פ', sound: '/sound/פ.mp3' },
  { letter: 'צ', sound: '/sound/צ.mp3' },
  { letter: 'ק', sound: '/sound/ק.mp3' },
  { letter: 'ר', sound: '/sound/ר.mp3' },
  { letter: 'ש', sound: '/sound/ש.mp3' },
  { letter: 'ת', sound: '/sound/ת.mp3' }
];
// Function to play sound associated with a letter
function playSound(soundPath) {
  const audio = new Audio(soundPath);
  audio.play();
}
// Component to display the letter buttons
function LetterUnit() {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Learn Letters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {letters.map((letter) => (
          <button
            key={letter.letter}
            onClick={() => playSound(letter.sound)}
            className="flex justify-center items-center dark:bg-gray-700 h-20 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 active:bg-gray-300 dark:active:bg-gray-700"
          >
            <span className="text-3xl font-bold text-black-500 dark:text-white-400">{letter.letter}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default LetterUnit;