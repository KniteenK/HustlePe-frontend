import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import auth from './AuthPage'


const Header = () => {
  const navigate = useNavigate(); // Initialize navigate object for navigation

  const handleLoginClick = () => {
    navigate('/auth'); // Navigate to the login page
  };

  const handleSignUpClick = () => {
    navigate('/auth'); // Navigate to the signup page
  };

  return (
    <header className="bg-black text-white p-4 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="#home" className="hover:text-gray-400 transition duration-300">HustlePe</a>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="#features" className="text-lg hover:text-gray-400 transition duration-300">Features</a>
          <a href="#pricing" className="text-lg hover:text-gray-400 transition duration-300">Pricing</a>
          <a href="#blog" className="text-lg hover:text-gray-400 transition duration-300">Blog</a>
          <a href="#contact" className="text-lg hover:text-gray-400 transition duration-300">Contact</a>
          <button 
            onClick={handleLoginClick} 
            className="bg-gray-800 text-white py-2 px-4 rounded-full hover:bg-gray-700 transition duration-300"
          >
            Login
          </button>
          <button 
            onClick={handleSignUpClick} 
            className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
