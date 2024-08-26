import React from 'react';
// Component for displaying a video in a popup with a proceed to questions button
const VideoPopup = ({ videoUrl, onClose }) => {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white p-4 rounded shadow-md max-w-3xl w-full" 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Topic Explanation</h2> {/* Title */}
        <iframe
          width="100%"
          height="500" 
          src={`${videoUrl}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0`} 
          title="Video player"
          frameBorder="0"
          allowFullScreen
        ></iframe> 
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={onClose}
        >
          Proceed to Questions
        </button>
      </div>
    </div>
  );
};

export default VideoPopup;