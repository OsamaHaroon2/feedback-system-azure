import axios from "axios";
const API_BASE_URL =process.env.REACT_APP_BACKEND_URL;

export const getFeedback = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const response = await axios.get(`${API_BASE_URL}/retrieve-feedback?${params}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const generateReport = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const response = await axios.get(`${API_BASE_URL}/generate-report?${params}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data.reportLink;
};
