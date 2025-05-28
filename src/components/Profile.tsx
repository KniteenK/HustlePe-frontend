// ProfilePage.js
import React from 'react';
import { FaGithub, FaLinkedin, FaEdit, FaDownload, FaUpload } from 'react-icons/fa';
import Header from './Header';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-black p-10">
      <Header />
      <div className="max-w-full bg-black rounded-lg shadow-2xl p-8">
        <div className="flex">
          {/* Left Side: Profile Details */}
          <div className="w-1/3 pr-6">
            <div className="relative flex flex-col items-center mb-8">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-700 shadow-xl"
              />
              <button className="absolute bottom-2 right-2 bg-purple-500 text-white p-2 rounded-full shadow-xl hover:bg-purple-700 transition duration-300 transform hover:rotate-12">
                <FaEdit />
              </button>
            </div>
            <div className="text-gray-100 text-center">
              <h2 className="text-3xl font-bold">John Doe</h2>
              <p className="text-gray-400">Crazy Coder & Designer</p>
            </div>
            <div className="mt-8 bg-gray-800 rounded-lg p-4">
              <h3 className="text-gray-400 text-xl font-semibold mb-2">Bio</h3>
              <p className="text-gray-100">Add here this</p>
            </div>
            <div className="mt-8 bg-gray-800 rounded-lg p-4">
              <h3 className="text-gray-400 text-xl font-semibold mb-2">Education</h3>
              <p className="text-gray-100">Add here this</p>
            </div>
            <div className="mt-8 bg-gray-800 rounded-lg p-4">
              <h3 className="text-gray-400 text-xl font-semibold mb-2">Languages</h3>
              <p className="text-gray-100">Add here this</p>
            </div>
            <div className="mt-8 flex space-x-4 justify-center">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-purple-500 transition duration-300">
                <FaGithub size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-blue-500 transition duration-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Middle Section: Portfolio and Details */}
          <div className="w-2/3">
            <div className="mb-8">
              <h3 className="text-2xl text-gray-100 font-bold mb-4">Portfolio</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-100">Add here this</p>
                <input type="file" className="mt-4 w-full text-gray-100" />
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl text-gray-100 font-bold mb-4">Projects</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-100">Add here this</p>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl text-gray-100 font-bold mb-4">Resume</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <input type="file" className="mt-4 w-full text-gray-100" />
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl text-gray-100 font-bold mb-4">Experience</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-100">Add here this</p>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl text-gray-100 font-bold mb-4">Gigs History</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-100">No items</p>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl text-gray-100 font-bold mb-4">Current Gigs</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-100">No items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
