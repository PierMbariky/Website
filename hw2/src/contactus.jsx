import React from 'react';

function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-lg mb-8 text-center">
          Have any questions or feedback? We'd love to hear from you! Please fill out the form below or reach out to us through our social media channels.
        </p>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg mb-8">
          <form>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
                rows="5"
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Send
            </button>
          </form>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Our Office</h2>
          <p className="text-lg">
          Snunit 51 st,Karmiel 2161002,Israel
          </p>
          <p className="text-lg">
            Email: contact@playwise.com
          </p>
          <p className="text-lg">
            Phone: +972-4-2161002
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h11v-9H9v-4h4V8c0-4 2-6 6-6 1 0 2 0 3 .1V6h-2c-2 0-3 1-3 3v3h4l-1 4h-3v9h6c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z"/></svg>
          </a>
          <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23 2.6c-.9.4-1.8.6-2.8.7 1-0.6 1.8-1.6 2.2-2.7-.9.5-1.9.9-3 1-0.9-1-2.2-1.6-3.6-1.6-2.7 0-4.8 2.2-4.8 4.8 0 .4 0 .8.1 1.1-4-.2-7.5-2.1-9.8-5-0.4.6-.6 1.3-.6 2 0 1.6.8 3 2.1 3.9-0.8 0-1.5-0.2-2.1-0.6v.1c0 2.3 1.6 4.2 3.7 4.6-0.4.1-0.8.2-1.2.2-0.3 0-0.6 0-0.9-0.1 0.6 2 2.5 3.5 4.7 3.6-1.7 1.3-3.9 2-6.2 2-0.4 0-0.7 0-1.1-0.1 2.2 1.4 4.8 2.2 7.6 2.2 9.1 0 14-7.5 14-14v-0.6c0.9-0.7 1.8-1.6 2.4-2.5z"/></svg>
          </a>
          <a href="https://linkedin.com" className="text-blue-800 hover:text-blue-900">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19.4 19.4h-3.5v-5.4c0-1.3-.5-2.1-1.8-2.1-1 0-1.6.7-1.9 1.4-.1.3-.1.7-.1 1v5.1H8.6V10h3.5v1.3c.5-.7 1.3-1.8 3.1-1.8 2.2 0 3.8 1.4 3.8 4.4v5.5zM4.9 8.6h-.1c-1.2 0-1.9-.8-1.9-1.8 0-1 .7-1.8 1.8-1.8s1.9.7 1.9 1.8c0 1-.7 1.8-1.7 1.8zM3.1 19.4h3.6V10H3.1v9.4zM21.8 0H2.2C1 0 0 .9 0 2.2v19.5C0 23 1 24 2.2 24h19.6c1.2 0 2.2-1 2.2-2.2V2.2C24 .9 23 0 21.8 0z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
