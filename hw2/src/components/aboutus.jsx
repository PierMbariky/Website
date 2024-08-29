import React from 'react';
// Component to display information about the company and team members
function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
        <p className="text-lg mb-4">
          Welcome to Playwise! We are dedicated to providing the best experience for our users.
          Our mission is to make learning and playing enjoyable and accessible to everyone.
        </p>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
          <p className="text-lg">
            Our mission is to create a platform that combines the fun of gaming with the value of learning.
            We believe that learning should be engaging and interactive, and our goal is to help users achieve
            their educational objectives while having a great time.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
              <img
                src="/picture/redan.png"
                alt="Team Member"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Redan ganim</h3>
              <p className="text-gray-600 dark:text-gray-300">Chairman</p>
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
              <img
                src="/picture/pier.jpg"
                alt="Team Member"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Pier Mbariky</h3>
              <p className="text-gray-600 dark:text-gray-300">CEO</p>
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
              <img
                src="/picture/asaad.jpg"
                alt="Team Member"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Asaad sajim</h3>
              <p className="text-gray-600 dark:text-gray-300">CTO</p>
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
              <img
                src="/picture/jol.jpg"
                alt="Team Member"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Joul Hourany</h3>
              <p className="text-gray-600 dark:text-gray-300">CFO</p>
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
              <img
                src="/picture/nadeen.png"
                alt="Team Member"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Nadeen Halabi</h3>
              <p className="text-gray-600 dark:text-gray-300">COO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
