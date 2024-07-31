import React, { useState, useEffect } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import { FaBell, FaUser, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('LoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleSignUpClick = () => {
    navigate('/auth');
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!
      isDropdownOpen);
  };
  const handleYourProfileClick = () => {
    navigate('/profile');
  };

  const handleLogoutClick = () => {
    localStorage.setItem('LoggedIn', 'false');
    setIsLoggedIn(false);
    navigate('/auth');
  };

  return (
    <header className="bg-black text-white p-4 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
        <Link to="/" className="hover:text-gray-400 transition duration-300">HustlePe</Link>
        </div>
        <nav className="flex items-center space-x-6">
          <Link to="/features" className="text-lg hover:text-gray-400 transition duration-300">Features</Link>
          <Link to="/pricing" className="text-lg hover:text-gray-400 transition duration-300">Pricing</Link>
          <Link to="/blog" className="text-lg hover:text-gray-400 transition duration-300">Blog</Link>
          <Link to="/contact" className="text-lg hover:text-gray-400 transition duration-300">Contact</Link>
          {isLoggedIn ? (
            <>
              <button className="relative">
                <FaBell className="text-white text-2xl hover:text-gray-400 transition duration-300" />
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">3</span>
              </button>
              <button onClick={handleProfileClick} className="relative">
                <FaUser className="text-white text-2xl hover:text-gray-400 transition duration-300" />
                {isDropdownOpen && (
                  <div 
                    onClick={handleYourProfileClick}
                    className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2 z-10 animate-fade-in">
                    <a href="#profile" className="flex items-center px-4 py-2 hover:bg-gray-200">
                      <FaUserCircle className="mr-2" /> Profile
                    </a>
                    <a href="#settings" className="flex items-center px-4 py-2 hover:bg-gray-200">
                      <FaCog className="mr-2" /> Settings
                    </a>
                    <button 
                      onClick={handleLogoutClick} 
                      className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-200"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
