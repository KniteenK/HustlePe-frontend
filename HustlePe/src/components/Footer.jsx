import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>&copy; 2024 HustlePe. All rights reserved.</p>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
          <a href="#dashboard" className="hover:text-gray-400 transition duration-300">HustlePe Dashboard</a>
          <a href="#about" className="hover:text-gray-400 transition duration-300">About Us</a>
          <a href="#help" className="hover:text-gray-400 transition duration-300">Help and Support</a>
          <a href="#contact" className="hover:text-gray-400 transition duration-300">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
