import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select, { type SingleValue } from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/Images/Logo.png";

// Types for country and city options
type CountryOption = {
  label: string;
  value: string;
  flag: string;
};
type CityOption = {
  label: string;
  value: string;
};

type FormData = {
  username: string;
  email: string;
  password: string;
  contactNumber: string;
  city: string;
  country: string;
  organisationName: string;
};

const RegisterClient = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    contactNumber: "",
    city: "",
    country: "",
    organisationName: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch countries using countriesnow.space API
    axios
      .get("https://countriesnow.space/api/v0.1/countries")
      .then((response) => {
        const data = response.data;
        if (data && Array.isArray(data.data)) {
          const countryList: CountryOption[] = data.data
            .map((country: any) => ({
              label: country.country,
              value: country.country,
              flag: "", // countriesnow.space does not provide flag, so leave empty or use a placeholder if needed
            }))
            .sort((a: CountryOption, b: CountryOption) => a.label.localeCompare(b.label));
          setCountries(countryList);
        } else {
          setCountries([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setCountries([]);
      });
  }, []);

  useEffect(() => {
    if (formData.country) {
      // Fetch cities based on selected country
      axios
        .post("https://countriesnow.space/api/v0.1/countries/cities", { country: formData.country })
        .then((response) => {
          const cityList: string[] = response.data.data.sort();
          setCities(cityList);
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [formData.country]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // For react-select country
  const handleCountrySelect = (option: SingleValue<CountryOption>) => {
    setFormData({ ...formData, country: option ? option.value : "", city: "" });
    setCities([]);
  };

  // For react-select city
  const handleCitySelect = (option: SingleValue<CityOption>) => {
    setFormData({ ...formData, city: option ? option.value : "" });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password, contactNumber, city, country, organisationName } = formData;

    if ([username, email, password, contactNumber, city, country, organisationName].some((field) => field.trim() === "")) {
      toast.error("Please fill all the fields", {
        position: "bottom-right",
        autoClose: 2000,
        style: {
          backgroundColor: "red",
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
      address: {
        city,
        country,
      },
      organisation: organisationName,
    };

    console.log("Request Body:", requestBody);

    try {
      const response = await axios.post("http://localhost:2000/api/v1/client/signupClient", requestBody, {
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="text-center mb-8">
                <h3 className="text-gray-800 text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  Register as Client
                </h3>
                <p className="text-gray-600 text-lg mt-4 leading-relaxed">
                  Find the perfect freelancers for your projects
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-3 block">Username</label>
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full text-sm text-gray-800 border-2 border-green-200 px-4 py-4 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 hover:border-green-300"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
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
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-3 block">Password</label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
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
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-3 block">Contact Number</label>
                  <input
                    name="contactNumber"
                    type="text"
                    required
                    className="w-full text-sm text-gray-800 border-2 border-green-200 px-4 py-4 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 hover:border-green-300"
                    placeholder="Enter contact number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-3 block">Country</label>
                  <Select
                    options={countries}
                    placeholder="Select country"
                    value={countries.find((c) => c.value === formData.country) || null}
                    onChange={handleCountrySelect}
                    styles={customSelectStyles}
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-3 block">City</label>
                  <Select
                    options={cities.map((city) => ({ label: city, value: city }))}
                    placeholder="Select city"
                    value={formData.city ? { label: formData.city, value: formData.city } : null}
                    onChange={handleCitySelect}
                    isDisabled={!formData.country}
                    styles={customSelectStyles}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-gray-700 text-sm font-medium mb-3 block">Organisation Name</label>
                  <input
                    name="organisationName"
                    type="text"
                    required
                    className="w-full text-sm text-gray-800 border-2 border-green-200 px-4 py-4 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 hover:border-green-300"
                    placeholder="Enter organisation name"
                    value={formData.organisationName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
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
                alt="Register Experience"
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterClient;
