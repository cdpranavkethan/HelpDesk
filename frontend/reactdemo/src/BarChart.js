// src/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ data }) {
  const chartData = {
    labels: ['Total Chats', 'Average Response Time'],
    datasets: [
      {
        label: 'Chats Data',
        data: [data.totalChats, data.averageResponseTime],
        backgroundColor: ['#007bff', '#ffc107'],
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

export default BarChart;
