import React, { useState, useEffect } from "react";
import { QUESTIONS } from "../../constants/questions";
import axios from "axios";
const API_BASE_URL =process.env.REACT_APP_BACKEND_URL;


const FeedbackForm = ({ subject, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [jwtToken, setJwtToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setJwtToken(token);
    } else {
      alert("User not authenticated. Please log in again.");
    }
  }, []);

  const questions = QUESTIONS[subject];

  const handleChange = (question, value) => {
    setAnswers({ ...answers, [question]: value });
  };

  const validateFeedback = () => {
    for (const q of questions) {
      if (q.type === "checkbox" && !answers[q.question]) {
        return `Please select at least one option for "${q.question}".`;
      }
      if ((q.type === "radio" || q.type === "slider") && !answers[q.question]) {
        return `Please provide a response for "${q.question}".`;
      }
      if (q.type === "text" && (!answers[q.question] || answers[q.question].trim() === "")) {
        return `Please provide feedback for "${q.question}".`;
      }
      if (q.type === "likert") {
        for (const statement of q.statements) {
          if (!answers[statement]) {
            return `Please provide a response for "${statement}".`;
          }
        }
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateFeedback();
    if (validationError) {
      alert(validationError);
      return;
    }

    if (!jwtToken) {
      alert("User not authenticated. Please log in again.");
      return;
    }

    try {
      const payload = {
        subject,
        feedback: answers,
      };

      const response = await axios.post(`${API_BASE_URL}/submit-feedback`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Feedback submitted successfully!");
        onComplete(subject);
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">Feedback for {subject}</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index} className="mb-6">
            <label className="block text-xl font-medium text-gray-700 mb-3">{q.question}</label>
            {q.type === "checkbox" && 
              q.options.map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleChange(q.question, {
                        ...answers[q.question],
                        [option]: e.target.checked,
                      })
                    }
                    className="h-5 w-5 text-teal-500 border-gray-300 rounded-md focus:ring-2 focus:ring-teal-300"
                  />
                  <span className="text-lg text-gray-700">{option}</span>
                </div>
              ))}
            {q.type === "radio" &&
              q.options.map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name={q.question}
                    onChange={() => handleChange(q.question, option)}
                    className="h-5 w-5 text-teal-500 border-gray-300 rounded-md focus:ring-2 focus:ring-teal-300"
                  />
                  <span className="text-lg text-gray-700">{option}</span>
                </div>
              ))}
            {q.type === "slider" && (
              <input
                type="range"
                min={q.range[0]}
                max={q.range[1]}
                onChange={(e) => handleChange(q.question, e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-full focus:ring-2 focus:ring-teal-300"
              />
            )}
            {q.type === "likert" &&
              q.statements.map((statement, idx) => (
                <div key={idx} className="mb-4">
                  <p className="text-lg text-gray-700">{statement}</p>
                  <div className="flex-1 items-center ">
                    {q.options.map((option) => (
                      <div key={option} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name={`${q.question}-${idx}`}
                          onChange={() => handleChange(statement, option)}
                          className="h-5 w-5 text-teal-500 border-gray-300 rounded-md focus:ring-2 focus:ring-teal-300"
                        />
                        <span className="text-lg text-gray-700">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            {q.type === "text" && (
              <textarea
                onChange={(e) => handleChange(q.question, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                rows="4"
                placeholder="Enter your feedback here..."
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-3 bg-teal-500 text-white text-xl font-semibold rounded-lg hover:bg-teal-600 transition duration-200"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;

