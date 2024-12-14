import React, { useState } from "react";
import SubjectList from "../Feedback/SubjectList";
import FeedbackForm from "../Feedback/FeedbackForm";
// import { getFeedbackStatus } from "../../services/feedbackService";

const StudentDashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [completedSubjects, setCompletedSubjects] = useState([]);
  const [allFeedbackSubmitted, setAllFeedbackSubmitted] = useState(false);

  const subjects = ["Mathematics", "Science", "History", "English", "Computer Science"];
  const handleComplete = (subject) => {
    setCompletedSubjects((prev) => [...prev, subject]);
    setSelectedSubject(null);

    // Check if all subjects are completed
    if (completedSubjects.length + 1 === subjects.length) {
      setAllFeedbackSubmitted(true);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Clear the user's token
    window.location.href = "/"; // Redirect to the home page
  };

  if (allFeedbackSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-10">
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 text-center">
          <h2 className="text-3xl font-semibold text-teal-600 mb-6">
            All feedback has been successfully submitted! Thank you.
          </h2>
          <button
            onClick={handleSignOut}
            className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg hover:bg-teal-600 transition duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6]">
      <div className="w-full max-w-4xl mx-auto py-10 px-6">
        <header className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-teal-600">Welcome to the Feedback Dashboard</h2>
          <button
            onClick={handleSignOut}
            className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-300"
          >
            Sign Out
          </button>
        </header>

        {!selectedSubject ? (
          <SubjectList
            onSelectSubject={setSelectedSubject}
            completedSubjects={completedSubjects}
            subjects={subjects}
          />
        ) : (
          <FeedbackForm subject={selectedSubject} onComplete={() => handleComplete(selectedSubject)} />
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
