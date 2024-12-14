import React, { useState } from "react";
import FeedbackFilters from "./FeedbackFilters";
import { retrieveFeedback } from "../../services/feedbackService";
import { generateReport, retrieveReports } from "../../services/reportService";
import FeedbackTable from "./FeedbackTable";
import FeedbackCharts from "./FeedbackCharts";
import { Card, message, Spin, Row, Col } from "antd";

const AdminDashboard = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [filters, setFilters] = useState({ subject: "", start_date: "", end_date: "" });
  const [loading, setLoading] = useState(false);
  const [specificReports, setSpecificReports] = useState([]);
  const [allSubjectReports, setAllSubjectReports] = useState([]);
  const [latestSpecificReport, setLatestSpecificReport] = useState(null);
  const [latestAllSubjectsReport, setLatestAllSubjectsReport] = useState(null);

  const convertToISODate = (date) => (date ? new Date(date).toISOString().split("T")[0] : "");

  const handleFilterChange = (newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }));

  const showToast = (type, content) => {
    if (type === "success") message.success(content);
    if (type === "error") message.error(content);
    if (type === "warning") message.warning(content);
  };

  const updateReportsList = async () => {
    try {
      const response = await retrieveReports();
      if (response?.data?.reports) {
        const specific = response.data.reports.filter((report) => report.name.includes("report_") && !report.name.includes("all_subjects"));
        const allSubjects = response.data.reports.filter((report) => report.name.includes("report_all_subjects"));
        setSpecificReports(specific);
        setAllSubjectReports(allSubjects);

        // Update latest reports
        if (specific.length > 0) setLatestSpecificReport(specific[0]); // Assuming reports are sorted by creation date
        if (allSubjects.length > 0) setLatestAllSubjectsReport(allSubjects[0]);
      } else {
        setSpecificReports([]);
        setAllSubjectReports([]);
      }
    } catch (err) {
      console.error("Error updating reports list:", err);
      showToast("error", "Failed to update reports list.");
    }
  };

  const handleRetrieveFeedback = async () => {
    setLoading(true);
    try {
      const response = await retrieveFeedback(filters);
      if (response?.data?.feedbacks) {
        setFeedbackData(response.data.feedbacks);
        showToast("success", "Feedback retrieved successfully.");
      } else {
        setFeedbackData([]);
        showToast("warning", "No feedback found for the selected filters.");
      }
    } catch (err) {
      console.error("Error retrieving feedback:", err);
      showToast("error", "Failed to retrieve feedback.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async (specificSubject = false) => {
    setLoading(true);
    try {
      const reportFilters = {
        start_date: convertToISODate(filters.start_date),
        end_date: convertToISODate(filters.end_date),
        subject: specificSubject ? filters.subject : undefined,
      };

      if (!reportFilters.start_date || !reportFilters.end_date) {
        showToast("warning", "Please select a valid start and end date.");
        setLoading(false);
        return;
      }

      if (specificSubject && !reportFilters.subject) {
        showToast("warning", "Please select a subject to generate the report.");
        setLoading(false);
        return;
      }

      const response = await generateReport(reportFilters);
      if (response.status === 200) {
        showToast("success", `Report for ${specificSubject ? filters.subject : "all subjects"} generated successfully.`);
        await updateReportsList(); // Refresh the reports list
      } else {
        showToast("error", "Failed to generate report.");
      }
    } catch (err) {
      console.error("Error generating report:", err);
      showToast("error", "Failed to generate report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard" style={{ padding: "20px", backgroundColor: "#f7f7f7" }}>
      <header className="flex items-center justify-between bg-teal-500 p-4 rounded-xl">
        <h1 className="text-2xl text-white">Admin Dashboard</h1>
        <button
          className="text-white"
          onClick={() => {
            // Clear session-related data
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // Redirect to the Main Page
            window.location.href = "/";
          }}
        >
          Sign Out
        </button>
      </header>
      <Spin spinning={loading}>
        <Row gutter={16}>
          <Col span={24}>
            <Card
              title="Filters & Actions"
              bordered={false}
              style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", backgroundColor: "#ffffff" }}
            >
              <FeedbackFilters filters={filters} onFilterChange={handleFilterChange} />
              <div className="admin-actions" style={{ marginTop: "20px" }}>
                <button
                  className="border p-2 rounded-lg border-teal-500 hover:bg-teal-500 hover:text-white"
                  style={{ marginRight: "10px" }}
                  onClick={handleRetrieveFeedback}
                >
                  Retrieve Feedback
                </button>
                <button
                  className="border p-2 rounded-lg border-teal-500 hover:bg-teal-500 hover:text-white"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleGenerateReport(false)}
                >
                  Generate All Subjects Report
                </button>
                <button
                  className="border p-2 rounded-lg border-teal-500 hover:bg-teal-500 hover:text-white"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleGenerateReport(true)}
                >
                  Generate Specific Subject Report
                </button>
                <button
                  className="border p-2 rounded-lg border-teal-500 hover:bg-teal-500 hover:text-white"
                  onClick={updateReportsList}
                >
                  Retrieve Reports
                </button>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Card
              title="Feedback Data"
              bordered={false}
              style={{ marginTop: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", backgroundColor: "#ffffff" }}
            >
              {feedbackData.length > 0 ? (
                <>
                  <FeedbackCharts feedbackData={feedbackData} />
                  <FeedbackTable feedbackData={feedbackData} />
                </>
              ) : (
                <p>No feedback available.</p>
              )}
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="Available Reports"
              bordered={false}
              style={{ marginTop: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", backgroundColor: "#ffffff" }}
            >
              <h3 style={{ marginBottom: "15px", fontWeight: "600" }}>Specific Subject Reports</h3>
              {specificReports.length > 0 ? (
                <ul>
                  {specificReports.map((report, idx) => (
                    <li key={idx}>
                      <a href={report.url} target="_blank" rel="noopener noreferrer">
                        {report.name === latestSpecificReport?.name ? <strong>{report.name} (Latest)</strong> : report.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No specific subject reports found.</p>
              )}
              <h3 style={{ marginTop: "20px", marginBottom: "15px", fontWeight: "600" }}>All Subjects Reports</h3>
              {allSubjectReports.length > 0 ? (
                <ul>
                  {allSubjectReports.map((report, idx) => (
                    <li key={idx}>
                      <a href={report.url} target="_blank" rel="noopener noreferrer">
                        {report.name === latestAllSubjectsReport?.name ? <strong>{report.name} (Latest)</strong> : report.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No all subjects reports found.</p>
              )}
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default AdminDashboard;
