import React from "react";
import { useNavigate } from "react-router-dom";
import pic from "../../assets/feedback.jpg"
const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-90 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center gap-8 px-6 sm:px-10 lg:px-20 py-16" data-aos="fade-down">
        {/* Left Content: Text and Buttons */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-snug text-gray-900">
            Welcome to the <span className="text-teal-500">Feedback System</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl mb-8 text-gray-600">
            Share your valuable insights, streamline communication, and drive improvement through our professional feedback platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium text-lg rounded-full shadow-md transform hover:-translate-y-1 transition"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium text-lg rounded-full shadow-md transform hover:-translate-y-1 transition"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Right Content: Image */}
        <div className="w-full lg:w-1/2 flex justify-center"  data-aos="fade-left">
          <img
            src={pic}
            alt="Feedback illustration"
            className="max-w-full rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
