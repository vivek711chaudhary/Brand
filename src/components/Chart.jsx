import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Chart = ({ data, title }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: title,
        color: 'white',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgb(75, 85, 99)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (context.dataset.label.includes('Market Cap')) {
                label += `$${(context.parsed.y / 1000000).toFixed(2)}M`;
              } else if (context.dataset.label.includes('Volume')) {
                label += `$${(context.parsed.y / 1000).toFixed(2)}K`;
              } else {
                label += `${context.parsed.y.toFixed(2)}%`;
              }
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
          callback: function(value) {
            if (this.chart.config._config.data.datasets[0].label.includes('Market Cap')) {
              return `$${(value / 1000000).toFixed(0)}M`;
            } else if (this.chart.config._config.data.datasets[0].label.includes('Volume')) {
              return `$${(value / 1000).toFixed(0)}K`;
            }
            return `${value.toFixed(1)}%`;
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="h-[400px]">
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
