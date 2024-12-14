import { apiClient } from "./api";

export const signIn = async (credentials) => {
  const response = await apiClient.post("/signin", credentials);
  const { token, role } = response.data;

  if (token) {
    localStorage.setItem("jwt", token); // Save JWT for authenticated requests
    localStorage.setItem("role", role); // Save user role
  }
  return response.data;
};

export const register = async (userData) => {
  return apiClient.post("/register", userData);
};
