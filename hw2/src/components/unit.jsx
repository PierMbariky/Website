import React, { useState } from 'react';

function Unit({ unit, className = '', onClick }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(true);
    setTimeout(() => setActive(false), 200);
    onClick(unit); // Call the onClick prop with the unit object
  };
  // The Unit component represents a card for a specific unit.
  // It displays:
  // - The unit's title and description.
  // - A button labeled "Learn More."
  // - The component uses Tailwind CSS for styling, with dark mode support.
  // - It features an animation effect when clicked, indicated by the "animate-pulse" class.
  return (
    <div
      className={`${className} bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-md transition duration-300 ease-in-out p-6 m-2 flex flex-col items-center justify-center cursor-pointer ${active ? 'animate-pulse' : ''
        }`}
      onClick={handleClick}
      style={{ flexBasis: '45%' }}
    >

      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200">
        {unit.Title}
      </h3>
      <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
        {unit.Description}
      </p>
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-700 hover:bg-blue-900 dark:hover:bg-blue-900  dark:text-white text-gray-900 font-bold py-2 px-4 rounded-lg"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

export default Unit;