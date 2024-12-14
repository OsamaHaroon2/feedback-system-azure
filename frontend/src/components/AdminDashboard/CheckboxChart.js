import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale, // Registers the "category" scale
  LinearScale,   // Registers the linear scale
  BarElement,    // Registers bar chart elements
  Title,
  Tooltip,
  Legend
);

const CheckboxChart = ({ aggregatedData, question }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const labels = Object.keys(aggregatedData[question]);
    const data = Object.values(aggregatedData[question]);

    const chartInstance = new ChartJS(ctx, {
      type: "bar", // or "pie" depending on your visualization
      data: {
        labels,
        datasets: [
          {
            label: question,
            data,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          x: { type: "category" }, // Ensure 'category' scale type is explicitly set
          y: { beginAtZero: true },
        },
      },
    });

    return () => {
      if (chartInstance) chartInstance.destroy(); // Cleanup old chart instance
    };
  }, [aggregatedData, question]);

  return <canvas ref={chartRef} />;
};

export default CheckboxChart;
