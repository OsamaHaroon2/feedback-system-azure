import React from "react";

const FeedbackTable = ({ feedbackData }) => {
  return (
    <table className="feedback-table">
      <thead>
        <tr>
          <th>Subject</th>
          <th>Question</th>
          <th>Feedback</th>
        </tr>
      </thead>
      <tbody>
        {feedbackData.map((feedback, feedbackIndex) =>
          Object.entries(feedback.feedback).map(([question, response], index) => (
            <tr key={`${feedbackIndex}-${index}`}>
              <td>{feedback.subject}</td>
              <td>{question}</td>
              <td>{typeof response === "object" ? JSON.stringify(response) : response}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default FeedbackTable;
