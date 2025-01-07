import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Stat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

interface BarGraphProps {
  stats: Stat[];
}

const BarGraph: React.FC<BarGraphProps> = ({ stats }) => {
  // Extracting data for the graph
  const labels = stats.map((e) => e.stat.name); // e.g., ["hp", "attack", ...]
  const dataValues = stats.map((e) => e.base_stat); // e.g., [45, 49, ...]

  const data = {
    labels, // x-axis labels
    datasets: [
      {
        label: "Stats", // Legend label
        data: dataValues, // y-axis data
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Bar border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Pokemon Stats",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarGraph;
