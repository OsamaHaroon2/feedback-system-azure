import React, { useState } from "react";
import { apiClient } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the server
      const response = await apiClient.post("/signin", formData);
  
      // Save the received token in localStorage
      const token = response.data.token;
      localStorage.setItem("token", token);
  
      // Decode the JWT token to extract user role
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode payload from JWT
      const userRole = decodedToken.role;
  
      // Display success message
      setMessage({ type: "success", text: "Login successful!" });
  
      // Navigate based on user role
      if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else if (userRole === "student") {
        navigate("/student-dashboard");
      } else {
        setMessage({ type: "error", text: "Invalid user role." });
      }
    } catch (err) {
      // Handle login error
      console.error("Login error:", err);
      setMessage({
        type: "error",
        text: "Invalid credentials. Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6]">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-fit bg-teal-500 text-white py-3 px-4 rounded-lg hover:bg-white hover:border-teal-500 border-2 hover:text-teal-500 transition duration-300"
            >
              Login
            </button>
          </div>

          <div className="flex justify-center">
            Don't have an account? 
            <Link className="mx-1 text-teal-500 hover:text-teal-700" to="/register">
              Register
            </Link>
          </div>
        </form>

        {/* Message Display */}
        {message && (
          <p
            className={`mt-6 text-center font-medium text-sm ${
              message.type === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
