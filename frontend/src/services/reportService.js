import axios from "axios";
const API_BASE_URL =process.env.REACT_APP_BACKEND_URL;

export const generateReport = async (filters) => {
  const { start_date, end_date, subject } = filters;
  const queryParams = new URLSearchParams({
    start_date,
    end_date,
    ...(subject && { subject }), // Include subject only if it's defined
  });

  try {
    const response = await axios.get(`${API_BASE_URL}/generate-report?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
};

export const retrieveReports = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/retrieve-reports`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error retrieving reports:", error);
    throw error;
  }
};
