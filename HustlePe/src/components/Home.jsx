import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('https://api.example.com/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Header />
      <main className="flex-grow p-8 max-w-7xl mx-auto text-center">
         <h1 className="text-6xl font-extrabold mb-6">Empower Your Freelance Journey with HustlePe</h1>
         <p className="text-xl mb-6">Navigate Your Path, Connect with Clients, and Elevate Your Career with Our Comprehensive Freelancing Platform</p>
        <div className="flex justify-center mb-6">
          {/* Replace with your testimonials component */}
          <img src="path-to-testimonials-image" alt="Testimonials" className="rounded-full shadow-lg" />
        </div>
        <p className="text-lg mb-8">Trusted by 27,000+ creators</p>
        <button className="bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 shadow-lg">Get Started</button>
        <div className="mt-8">
          <input 
            type="text" 
            placeholder="Search for jobs..." 
            value={searchQuery} 
            onChange={handleSearchChange} 
            className="w-full p-4 rounded-full text-gray-900"
          />
        </div>
        {data ? (
          <div className="mt-12 text-left">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Job Listings:</h2>
            <div className="bg-gray-100 p-4 rounded-lg text-gray-800">
              {data.jobs.map((job, index) => (
                <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow">
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="text-gray-700">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-12 text-center text-gray-500">Loading...</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
