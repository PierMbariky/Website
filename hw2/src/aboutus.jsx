import React from 'react';

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
                src="https://media-mrs2-3.cdn.whatsapp.net/v/t61.24694-24/218641721_1017769079073594_87198498315670220_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_Q5AaIA1YX4tY_9JgujmAfQVMZMzHqlwLsFPk0nUjkiL5_9xf&oe=66B28234&_nc_sid=e6ed6c&_nc_cat=105"
                alt="Team Member"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Redan ganim</h3>
              <p className="text-gray-600 dark:text-gray-300">Chairman</p>
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
              <img
                src="https://media-mrs2-3.cdn.whatsapp.net/v/t61.24694-24/328800338_948561767071230_8729849892269641455_n.jpg?ccb=11-4&oh=01_Q5AaIHGxukHSAHhCI8nEYDi8WIeK4_BmiuJaF_qbOvTE9-Q_&oe=66B2932B&_nc_sid=e6ed6c&_nc_cat=111"
                alt="Team Member"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Pier Mbariky</h3>
              <p className="text-gray-600 dark:text-gray-300">CEO</p>
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
              <img
                src="https://media-mrs2-1.cdn.whatsapp.net/v/t61.24694-24/414192696_1317875162252144_5701551386881286179_n.jpg?ccb=11-4&oh=01_Q5AaICjgUUxigTCSbkkOad2iEZwCKbbzQJFWfGRchSfh0H5L&oe=66B2654B&_nc_sid=e6ed6c&_nc_cat=103"
                alt="Team Member"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Asaad sajim</h3>
              <p className="text-gray-600 dark:text-gray-300">CTO</p>
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
              <img
                src="https://media-mrs2-1.cdn.whatsapp.net/v/t61.24694-24/347466143_257079873530361_4844966495671500959_n.jpg?ccb=11-4&oh=01_Q5AaIIvJHyD5oXCgoRYL5JghlfegRmsjXNGh-RAEhVZrcjEw&oe=66B27645&_nc_sid=e6ed6c&_nc_cat=100"
                alt="Team Member"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Jol Horani</h3>
              <p className="text-gray-600 dark:text-gray-300">CFO</p>
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
              <img
                src="https://media-mrs2-1.cdn.whatsapp.net/v/t61.24694-24/427190015_902254798305008_7551432432306399211_n.jpg?ccb=11-4&oh=01_Q5AaIF4kWPU0IcMjsw9wD0qD26ObpCCUwt4cnXII5_Aerb-1&oe=66B27A5A&_nc_sid=e6ed6c&_nc_cat=100"
                alt="Team Member"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Nadeen Halabi</h3>
              <p className="text-gray-600 dark:text-gray-300">Fired</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
