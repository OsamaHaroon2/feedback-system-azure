import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

const FeedbackCharts = ({ feedbackData }) => {
  const chartRefs = useRef({});

  useEffect(() => {
    Chart.register(...registerables);

    Object.keys(chartRefs.current).forEach((key) => {
      if (chartRefs.current[key]) {
        chartRefs.current[key].destroy();
      }
    });

    const questionWiseData = {};

    feedbackData.forEach((feedback) => {
      Object.entries(feedback.feedback).forEach(([question, response]) => {
        if (!questionWiseData[question]) {
          questionWiseData[question] = [];
        }
        questionWiseData[question].push(response);
      });
    });

    Object.entries(questionWiseData).forEach(([question, responses], index) => {
      const ctx = document.getElementById(`chart-${index}`)?.getContext("2d");

      if (!ctx) return;

      const data = Array.isArray(responses[0])
        ? responses.flat().reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
          }, {})
        : responses.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
          }, {});

      const labels = Object.keys(data);
      const values = Object.values(data);

      chartRefs.current[question] = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: question,
              data: values,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });

    return () => {
      Object.keys(chartRefs.current).forEach((key) => {
        if (chartRefs.current[key]) {
          chartRefs.current[key].destroy();
        }
      });
    };
  }, [feedbackData]);

  return (
    <div className="feedback-charts">
      {Object.keys(feedbackData[0]?.feedback || {}).map((question, index) => (
        <div key={index} className="chart-container">
          <canvas id={`chart-${index}`} />
        </div>
      ))}
    </div>
  );
};

export default FeedbackCharts;
