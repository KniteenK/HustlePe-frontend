import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/Images/Logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onSubmit = async () => {
    if (email === "" || password === "") {
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
    try {
      const url = "http://localhost:2000/api/v1/hustler/signInHustler";
      const body = { email, password };
      const response = await axios.post(url, body);

      if (response.status === 200) {
        alert("Logged in successfully");
        console.log("Logged in successfully");
        Cookies.set("userData", JSON.stringify(response.data.data.userData), { expires: 1 });
        Cookies.set("accessToken", JSON.stringify(response.data.data.accessToken));
        Cookies.set("refreshToken", JSON.stringify(response.data.data.refreshToken));

        const role = response.data.data.role;
        console.log(role);
        if (role === "hustler") {
          navigate("/hustler");
        } else if (role === "client") {
          navigate("/client");
        } else {
          toast.error("Unknown role. Please contact support.");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      const errorMessage = (error as any).response?.data?.message || "An error occurred. Please try again.";
      console.log(errorMessage);
      toast.error(errorMessage);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="flex justify-start items-center w-full p-6">
        <Link to="/">
          <img src={logo} alt="HustlePe Logo" className="h-28 w-auto cursor-pointer hover:scale-105 transition-transform duration-300" />
        </Link>
      </div>
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-8 px-4">
        <div className="grid md:grid-cols-2 items-center gap-12 max-w-6xl w-full">
          <div className="bg-white border border-green-200 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 max-md:mx-auto">
            <form className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-gray-800 text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  Welcome Back
                </h3>
                <p className="text-gray-600 text-lg mt-4 leading-relaxed">
                  Sign in to continue your journey with HustlePe
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-3 block">Email / Username</label>
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full text-sm text-gray-800 border-2 border-green-200 px-4 py-4 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 hover:border-green-300"
                      placeholder="Enter your email or username"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
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
                      placeholder="Enter your password"
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
                  onClick={onSubmit}
                >
                  Sign In
                </button>
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <Link to="/Intermediate" className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors duration-200">
                    Create one now
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
                alt="Login Experience"
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};


export default Login;
