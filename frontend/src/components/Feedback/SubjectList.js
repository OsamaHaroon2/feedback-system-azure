import React from "react";

const SubjectList = ({ onSelectSubject, completedSubjects, subjects }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Select a Subject to Provide Feedback</h2>
      <ul className="space-y-2">
        {subjects.map((subject) => (
          <li key={subject}>
            <button
              onClick={() => onSelectSubject(subject)}
              disabled={completedSubjects.includes(subject)}
              className={`w-full p-2 text-lg font-medium rounded-md ${
                completedSubjects.includes(subject)
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-white text-black border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {subject} {completedSubjects.includes(subject) && "✓"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectList;
