import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart({ completedResources, completedMilestones, total }) {
  const completed = completedResources + completedMilestones;
  const incomplete = total - completed;

  const data = {
    labels: ['Resources', 'Milestones', 'Remaining'],
    datasets: [
      {
        label: 'Progress',
        data: [completedResources, completedMilestones, incomplete],
        backgroundColor: ['#4ade80', '#60a5fa', '#e5e7eb'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-24 h-24 mx-auto">
      <Doughnut data={data} options={options} />
    </div>
  );
}