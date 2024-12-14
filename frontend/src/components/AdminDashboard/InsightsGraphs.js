const InsightsGraphs = ({ feedbackData = [] }) => {
    if (!Array.isArray(feedbackData)) {
      console.error("Feedback data is not an array in InsightsGraphs.");
      feedbackData = [];
    }
  
    return (
      <div className="insights-graphs">
        <h2>Feedback Insights</h2>
        {feedbackData.length === 0 ? (
          <p>No feedback data available to display graphs.</p>
        ) : (
          <p>Graphs will be displayed here...</p>
          // Add graph logic here
        )}
      </div>
    );
  };
  
  export default InsightsGraphs;
  