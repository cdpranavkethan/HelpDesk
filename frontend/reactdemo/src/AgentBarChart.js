import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AgentBarChart({ data }) {
  const chartData = {
    labels: ['Tickets Resolved', 'Customer Satisfaction'],
    datasets: [
      {
        label: 'Agent Data',
        data: [data.ticketsResolved, data.customerSatisfaction],
        backgroundColor: ['#007bff', '#ffc107'],
        borderColor: 'rgba(255, 99, 132, 1)', // Add border color for the lines
        borderWidth: 1, // Add border width for the lines
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chat Data Overview',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default AgentBarChart;
