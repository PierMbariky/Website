// Unit.js
import React from 'react';
// Functional component for rendering a unit
function Unit({ unit, darkMode = false, className = '', onClick }) {
    // State to manage the active state for animation
  const [active, setActive] = React.useState(false);
  // Handler function for click events
  const handleClick = () => {
        // Set active state to true to trigger animation
    setActive(true);
    setTimeout(() => setActive(false), 200);
    onClick(unit); // Call the onClick prop with the unit object
  };
  // Determine background and text colors based on darkMode prop
  const backgroundColor = darkMode ? 'bg-orange-900' : 'bg-orange-500';
  const hoverBackgroundColor = darkMode ? 'bg-orange-800' : 'bg-orange-700';
  const textColor = darkMode ? 'text-white' : 'text-white';

  return (
    <div
      className={`${className} ${backgroundColor} hover:${hoverBackgroundColor} transition duration-300 ease-in-out rounded-full shadow-md p-4 m-2 flex items-center justify-center cursor-pointer ${
        active ? 'animate-pulse' : ''
      }`}
      onClick={handleClick}
      style={{ flexBasis: '45%' }} // Added style for flex basis
    >
      <div className="text-center text-white">
        <h3 className="text-lg font-bold">{unit.Title}</h3>
        <p className="text-sm">{unit.Description}</p>
      </div>
    </div>
  );
}

export default Unit;