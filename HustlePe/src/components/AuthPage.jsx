import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate(); 

  const handleFormSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleGoogleSignIn = () => {
    // Placeholder for Google sign-in functionality
    console.log('Google Sign-In button clicked');
    localStorage.setItem('LoggedIn', true) ;
    navigate('/Home') ;
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <header className="p-4 bg-gray-800 text-center">
        <h1 className="text-3xl font-bold">HustlePe</h1>
      </header>
      <main className="flex-grow p-6 max-w-md mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">{isSignup ? 'Sign Up' : 'Login'}</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <form className="flex flex-col items-center mb-6">
            <input
              type="email"
              placeholder="Email"
              className="mb-4 p-3 rounded-lg w-full max-w-sm text-gray-900 placeholder-gray-500 bg-gray-100"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="mb-4 p-3 rounded-lg w-full max-w-sm text-gray-900 placeholder-gray-500 bg-gray-100"
              required
            />
            {isSignup && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="mb-4 p-3 rounded-lg w-full max-w-sm text-gray-900 placeholder-gray-500 bg-gray-100"
                required
              />
            )}
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 shadow-lg mb-4"
            >
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>
          <p className="text-lg mb-4">Or sign in with:</p>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center bg-white text-gray-900 py-2 px-4 rounded-full hover:bg-gray-100 transition duration-300 shadow-lg w-full max-w-xs mx-auto"
          >
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" className="w-5 h-5 mr-2" />
            Sign {isSignup ? 'Up' : 'In'} with Google
          </button>
          <p className="mt-6 text-lg">
            {isSignup ? (
              <span>Already have an account? <button onClick={handleFormSwitch} className="text-blue-400 underline">Login</button></span>
            ) : (
              <span>New user? <button onClick={handleFormSwitch} className="text-blue-400 underline">Sign Up</button></span>
            )}
          </p>
        </div>
      </main>
      <footer className="p-4 bg-gray-800 text-center">
        <p className="text-sm">© 2024 HustlePe. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthPage;
