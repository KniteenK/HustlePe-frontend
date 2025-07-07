import axios from "axios";
import { useEffect, useState } from "react";
import type { FlagIconCode } from "react-flag-kit";
import { FlagIcon } from "react-flag-kit";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/Images/Logo.png";

const Signup = () => {
  const navigate = useNavigate();

  const OnSubmit = async () => {
    if ([username, email, password, contactNumber, firstName, lastName, city, country].some((field) => field.trim() === "")) {
      toast.error("Please fill all the fields", {
        position: "bottom-right",
        autoClose: 2000,
        style: {
          backgroundColor: "#dc2626",
          color: "white",
        },
      });
      return;
    }

    const requestBody = {
      username,
      email,
      password,
      contactNumber,
      first_name: firstName,
      last_name: lastName,
      address: {
        city,
        country,
      },
    };

    console.log("Request Body:", requestBody);

    try {
      const response = await axios.post("http://localhost:2000/api/v1/hustler/signupHustler", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        toast.success("Account created successfully!", {
          position: "bottom-right",
          autoClose: 2000,
        });
        navigate("/login");
      } else {
        toast.error(response.data.message || "Failed to create account", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<{ value: string; label: string }[]>([]);
  const [cities, setCities] = useState([]);

  // Function to format the country options with flags
  const formatCountryOption = ({ value, label }: { value: string; label: string }) => (
    <div className="flex items-center">
      <FlagIcon code={value as FlagIconCode} size={24} className="mr-2" />
      <span>{label}</span>
    </div>
  );

  useEffect(() => {
    // Fetch countries
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data
          .map((country: any) => ({
            value: country.cca2, // ISO country code
            label: country.name.common,
          }))
          .sort((a: { value: string; label: string }, b: { value: string; label: string }) => a.label.localeCompare(b.label));
        setCountries(countryList);
      });
  }, []);

  useEffect(() => {
    if (country) {
      // Fetch cities based on selected country
      fetch(`https://countriesnow.space/api/v0.1/countries/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country }),
      })
        .then((response) => response.json())
        .then((data) => {
          const cityList = data.data.sort();
          setCities(cityList);
        });
    }
  }, [country]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleContactNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => setContactNumber(e.target.value);
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      padding: "8px",
      border: "2px solid #bbf7d0",
      borderRadius: "12px",
      fontSize: "14px",
      "&:hover": {
        borderColor: "#86efac",
      },
      "&:focus": {
        borderColor: "#10b981",
        boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.2)",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#10b981" : state.isFocused ? "#dcfce7" : "white",
      color: state.isSelected ? "white" : "#374151",
      "&:hover": {
        backgroundColor: "#dcfce7",
        color: "#374151",
      },
    }),
  };
  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-green-50 to-white overflow-auto">
      <div className="flex justify-start items-center w-full p-6">
        <Link to="/">
          <img src={logo} alt="HustlePe Logo" className="h-28 w-auto cursor-pointer hover:scale-105 transition-transform duration-300" />
        </Link>
      </div>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8">
        <div className="grid md:grid-cols-2 items-center gap-12 max-w-7xl w-full">
          <div className="bg-white border border-green-200 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 max-md:mx-auto">
            <form className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-gray-800 text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  Join HustlePe
                </h3>
                <p className="text-gray-600 text-lg mt-4 leading-relaxed">
                  Start your freelancing journey with us today
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-3 block">First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    className="w-full text-sm text-gray-800 border-2 border-green-200 px-4 py-4 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 hover:border-green-300"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-3 block">Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    className="w-full text-sm text-gray-800 border-2 border-green-200 px-4 py-4 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 hover:border-green-300"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-3 block">Contact Number</label>
                  <input
                    name="contactNumber"
                    type="text"
                    required
                    className="w-full text-sm text-gray-800 border-2 border-green-200 px-4 py-4 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 hover:border-green-300"
                    placeholder="Enter contact number"
                    value={contactNumber}
                    onChange={handleContactNumberChange}
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-3 block">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full text-sm text-gray-800 border-2 border-green-200 px-4 py-4 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 hover:border-green-300"
                    placeholder="Enter email address"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-3 block">Country</label>
                  <Select
                    value={country ? countries.find((c) => c.label === country) : null}
                    onChange={(option) => setCountry(option ? option.label : "")}
                    options={countries}
                    formatOptionLabel={formatCountryOption}
                    placeholder="Select country"
                    styles={customSelectStyles}
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-3 block">City</label>
                  <Select
                    value={city ? { value: city, label: city } : null}
                    onChange={(option) => (option ? setCity(option.label) : setCity(""))}
                    options={cities.map((city) => ({ value: city, label: city }))}
                    placeholder="Select city"
                    styles={customSelectStyles}
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-3 block">Username</label>
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full text-sm text-gray-800 border-2 border-green-200 px-4 py-4 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 hover:border-green-300"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-3 block">Password</label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={handlePasswordChange}
                      className="w-full text-sm text-gray-800 border-2 border-green-200 px-4 py-4 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 hover:border-green-300"
                      placeholder="Enter password"
                    />
                    <svg
                      onClick={togglePasswordVisibility}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#10b981"
                      stroke="#10b981"
                      className="w-5 h-5 absolute right-4 top-4 cursor-pointer hover:fill-green-600 transition-colors duration-200"
                      viewBox="0 0 128 128"
                    >
                      <path
                        d={
                          showPassword
                            ? "M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994z"
                            : "M64 16c-34.193 0-62.672 23.995-63.541 25.005-1.459 1.822-1.459 4.168 0 5.99.869 1.01 29.348 25.005 63.541 25.005 34.193 0 62.672-23.995 63.541-25.005 1.459-1.822 1.459-4.168 0-5.99C126.672 39.995 98.193 16 64 16zm-5.506 66.632L36.258 60.396l8.728-8.728 14.508 14.508 32.258-32.258 8.728 8.728-40.506 40.506z"
                        }
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
                  onClick={OnSubmit}
                >
                  Create Account
                </button>
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors duration-200">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="lg:h-[500px] md:h-[400px] max-md:mt-8">
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8 h-full flex items-center justify-center">
              <img
                src="https://readymadeui.com/login-image.webp"
                className="w-full h-full max-md:w-4/5 mx-auto block object-cover rounded-xl shadow-lg"
                alt="Signup Experience"
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
