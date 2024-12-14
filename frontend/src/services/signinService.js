import axios from "axios";
const API_BASE_URL =process.env.REACT_APP_BACKEND_URL;

const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signin`, { email, password });
    const { token } = response.data; // Ensure the backend sends the token
    console.log("Received JWT Token:", token);

    if (token) {
      localStorage.setItem("jwtToken", token); // Save the token to localStorage
      alert("Login successful!");
      window.location.href = "/student-dashboard"; // Redirect to dashboard
    } else {
      alert("Login failed: No token received.");
    }
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    alert("Login failed. Please check your credentials.");
  }
};
