import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const formatValue = (value, type) => {
  if (type === 'marketCap') return `$${(value / 1e6).toFixed(2)}M`;
  if (type === 'volume') return `$${(value / 1e3).toFixed(2)}K`;
  if (type === 'growth') return `${value.toFixed(2)}%`;
  return value.toLocaleString();
};

const Chart = ({ data, title }) => {
  const [selectedCompanies, setSelectedCompanies] = useState({});
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    if (data?.datasets) {
      const initialSelected = data.datasets.reduce((acc, dataset) => {
        acc[dataset.label] = true;
        return acc;
      }, {});
      setSelectedCompanies(initialSelected);
    }
  }, [data]);

  useEffect(() => {
    if (!data?.datasets) return;

    const filteredDatasets = data.datasets.filter(dataset => 
      selectedCompanies[dataset.label]
    ).map(dataset => ({
      ...dataset,
      tension: 0.4,
      fill: true,
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        const color = dataset.borderColor.replace(')', ', 0.5)').replace('rgb', 'rgba');
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(17, 24, 39, 0)');
        return gradient;
      },
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: 'white',
      pointHoverBorderColor: dataset.borderColor,
      pointHoverBorderWidth: 2,
    }));

    setChartData({
      labels: data.labels,
      datasets: filteredDatasets
    });
  }, [data, selectedCompanies]);

  const toggleCompany = (companyName) => {
    setSelectedCompanies(prev => ({
      ...prev,
      [companyName]: !prev[companyName]
    }));
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 750,
      easing: 'easeInOutQuart',
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: title ? true : false,
        text: title || '',
        color: 'white',
        font: {
          size: 16,
          weight: 500
        },
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const dataset = context.dataset;
            const value = context.parsed.y;
            return `${dataset.label}: ${formatValue(value, dataset.yAxisID)}`;
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      marketCap: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          padding: 10,
          callback: value => `$${(value / 1e6).toFixed(0)}M`
        },
        title: {
          display: true,
          text: 'Market Cap',
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      volume: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          padding: 10,
          callback: value => `$${(value / 1e3).toFixed(0)}K`
        },
        title: {
          display: true,
          text: 'Volume',
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      growth: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          padding: 10,
          callback: value => `${value.toFixed(1)}%`
        },
        title: {
          display: true,
          text: 'Growth Rate',
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          padding: 10,
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  if (!data?.datasets) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-800/50 rounded-lg">
        <div className="text-gray-400">No data available</div>
      </div>
    );
  }

  return (
    <motion.div 
      className="w-full bg-gray-800/50 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Custom Legend with Toggles */}
      <div className="mb-6 flex flex-wrap gap-3">
        {data.datasets.map((dataset) => (
          <button
            key={dataset.label}
            onClick={() => toggleCompany(dataset.label)}
            className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCompanies[dataset.label]
                ? 'bg-opacity-100 shadow-md'
                : 'bg-opacity-50 opacity-50'
            }`}
            style={{
              backgroundColor: dataset.borderColor.replace(')', ', 0.1)').replace('rgb', 'rgba'),
              color: dataset.borderColor,
              border: `1px solid ${dataset.borderColor}`
            }}
          >
            <span 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: dataset.borderColor }}
            />
            {dataset.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        <Line data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

export default Chart;
