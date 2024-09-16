import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';


import logo from '../../../assets/Images/Logo.png';

const RegisterClient = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    contactNumber: '',
    city: '',
    country: '',
    organisationName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch countries with flag URLs
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const countryList = data.map(country => ({
          label: country.name.common,
          value: country.name.common,
          flag: country.flags.png // Added flag URL
        })).sort((a, b) => a.label.localeCompare(b.label));
        setCountries(countryList);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    if (formData.country) {
      // Fetch cities based on selected country
      axios.post('https://countriesnow.space/api/v0.1/countries/cities', { country: formData.country })
        .then(response => {
          const cityList = response.data.data.sort();
          setCities(cityList);
        })
        .catch(error => {
          console.error('Error fetching cities:', error);
        });
    }
  }, [formData.country]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, contactNumber, city, country, organisationName } = formData;

    if (
        [username, email, password, contactNumber, city, country, organisationName].some((field) => field.trim() === "")
    ) {
        toast.error('Please fill all the fields', {
            position: 'bottom-right',
            autoClose: 2000,
            style: {
                backgroundColor: 'red',
                color: 'white',
            },
        });
        return;
    }

    const requestBody = {
        username,
        email,
        password,
        contactNumber,
        address: {
          city,
          country,
        },
        organisation: organisationName,
    };

    console.log('Request Body:', requestBody);

    try {
        const response = await axios.post('http://localhost:2000/api/v1/client/signupClient', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            toast.success('Account created successfully!', {
                position: 'bottom-right',
                autoClose: 2000,
            });
            navigate('/login');
        } else {
            toast.error(response.data.message || 'Failed to create account', {
                position: 'bottom-right',
                autoClose: 2000,
            });
        }
    } catch (error) {
        toast.error('An error occurred. Please try again.', {
            position: 'bottom-right',
            autoClose: 2000,
        });
    }
};

  return (
    <div className="font-sans">
      <div className="flex justify-start items-center w-full p-4 overflow-hidden">
        <Link to="/">
          <img src={logo} alt="HustlePe Logo" className="h-28 w-auto cursor-pointer" />
        </Link>
      </div>
      <div className="min-h-[85vh] flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">Register as a Client</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">Join us today! Start your journey with us.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Username</label>
                  <input name="username" type="text" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" placeholder="Enter username" value={formData.username} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Email Address</label>
                  <input name="email" type="email" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" placeholder="Enter email address" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Password</label>
                  <div className="relative flex items-center">
                    <input name="password" type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={handleChange} className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" placeholder="Enter password" />
                    <svg onClick={togglePasswordVisibility} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                      <path d={showPassword ? "M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994z" : "M64 16c-34.193 0-62.672 23.995-63.541 25.005-1.459 1.822-1.459 4.168 0 5.99.869 1.01 29.348 25.005 63.541 25.005 34.193 0 62.672-23.995 63.541-25.005 1.459-1.822 1.459-4.168 0-5.99C126.672 39.995 98.193 16 64 16zm-5.506 66.632L36.258 60.396l8.728-8.728 14.508 14.508 32.258-32.258 8.728 8.728-40.506 40.506z"} data-original="#000000"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Contact Number</label>
                  <input name="contactNumber" type="text" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" placeholder="Enter contact number" value={formData.contactNumber} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Country</label>
                  <Select
                    options={countries}
                    placeholder="Select country"
                    classNamePrefix="react-select"
                    value={countries.find(c => c.value === formData.country)}
                    onChange={option => handleChange({ target: { name: 'country', value: option.value } })}
                    formatOptionLabel={country => (
                      <div className="flex items-center">
                        <img src={country.flag} alt={country.label} style={{ width: '20px', marginRight: '10px' }} />
                        {country.label}
                      </div>
                    )}
                    className="w-full text-sm text-gray-800 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">City</label>
                  <Select
                    options={cities.map(city => ({ label: city, value: city }))}
                    placeholder="Select city"
                    classNamePrefix="react-select"
                    value={cities.find(c => c.value === formData.city)}
                    onChange={option => handleChange({ target: { name: 'city', value: option.value } })}
                    isDisabled={!formData.country} // Disable city dropdown until country is selected
                    className="w-full text-sm text-gray-800 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Organisation Name</label>
                  <input name="organisationName" type="text" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" placeholder="Enter organisation name" value={formData.organisationName} onChange={handleChange} />
                </div>
              </div>

              <div className="mt-8">
                <button type="submit" className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img src="https://readymadeui.com/login-image.webp" className="w-full h-full max-md:w-4/5 mx-auto block object-cover" alt="Register Experience" />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterClient;