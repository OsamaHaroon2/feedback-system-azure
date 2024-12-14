import React from "react";

const FeedbackFilters = ({ filters, onFilterChange }) => {
  const subjects = ["Mathematics", "Science", "History", "English", "Computer Science"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="feedback-filters">
      <label>
        Subject:
        <select name="subject" value={filters.subject || ""} onChange={handleChange}>
          <option value="">All Subjects</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </label>
      <label>
        Start Date:
        <input
          type="date"
          name="start_date"
          value={filters.start_date || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          name="end_date"
          value={filters.end_date || ""}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default FeedbackFilters;
