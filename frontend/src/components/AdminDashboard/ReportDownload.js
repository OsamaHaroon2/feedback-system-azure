import React from "react";

const ReportDownload = ({ onGenerateReport }) => {
  return (
    <div className="report-download">
      <h2>Generate Report</h2>
      <button onClick={onGenerateReport}>Download Report</button>
    </div>
  );
};

export default ReportDownload;
