import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "https://feedback-system-func.azurewebsites.net/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;


// API Service Functions
export const registerUser = (data) => apiClient.post("/register", data);
export const loginUser = (data) => apiClient.post("/signin", data);
