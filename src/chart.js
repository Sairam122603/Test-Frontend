import React from 'react';
import { Bar } from 'react-chartjs-2';

function Charts() {
  const chartData = { /* Your chart data */ };
  const chartOptions = { /* Your chart options */ };

  return (
    <div className="chart">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default Charts;