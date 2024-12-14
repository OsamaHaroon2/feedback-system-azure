import axios from "axios";

const API_BASE_URL =process.env.REACT_APP_BACKEND_URL

// Function to submit feedback
export const submitFeedback = async (feedbackData) => {
  try {
    const token = localStorage.getItem("jwtToken"); // Retrieve JWT Token
    if (!token) {
      throw new Error("JWT Token not found. Please sign in again.");
    }

    const response = await axios.post(`${API_BASE_URL}/submit-feedback`, feedbackData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Check if the response status is 201 and the structure is correct
    if (response.status === 201 && response.data === "Feedback submitted successfully.") {
      return response.data;
    } else {
      throw new Error("Unexpected response from server.");
    }
  } catch (error) {
    console.error("Error in submitFeedback:", error);
    throw error;
  }
};

// export const getFeedbackStatus = async () => {
//   const token = localStorage.getItem("token");
//   const url = `${API_BASE_URL}/retrieve-feedback-status`; 

//   return await axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });
// };

// Function to retrieve feedback status for a student
export const retrieveFeedback = async ({ subject, start_date, end_date }) => {
  const token = localStorage.getItem("token");
  const url = `${API_BASE_URL}/retrieve-feedback?subject=${subject}&start_date=${start_date}&end_date=${end_date}`;

  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const generateReport = async (filters) => {
  const { subject, start_date, end_date } = filters;
  const token = localStorage.getItem("token");
  const url = `${API_BASE_URL}/generate-report?subject=${subject}&start_date=${start_date}&end_date=${end_date}`;
  
  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

