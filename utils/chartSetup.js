const colors = [
  '#36b9cc',
  '#1cc88a',
  '#6f42c1',
  '#e74a3b',
  '#fd7e14',
  '#f6c23e',
  '#84cc16',
  '#22c55e',
  '#2563eb',
  '#f43f5e',
  '#8b5cf6',
  '#ea580c',
  '#facc15',
];

// Populate Data for ChartJS
function populateData(param, type) {
  let labels = [];
  let totals = [];
  let bgColor = [];
  let borderColor = [];
  let labelName = '';
  switch (type) {
    // type actor = label & total
    case 'actor':
      param.map((item) => labels.push(item.label));
      param.map((item) => totals.push(item.total));
      bgColor = colors.slice(0, 13);
      borderColor = colors.slice(0, 13);
      labelName = 'Total Actors';
      break;
    // type movie = label & total
    case 'movie':
      param.map((item) => labels.push(item.label));
      param.map((item) => totals.push(item.total));
      bgColor = colors.slice(1, 13);
      borderColor = colors.slice(1, 13);
      labelName = 'Total Movie';
      break;
    // type director = label & total
    case 'director':
      param.map((item) => labels.push(item.label));
      param.map((item) => totals.push(item.total));
      bgColor = colors.slice(2, 13);
      borderColor = colors.slice(2, 13);
      labelName = 'Total Directors';
      break;
    // type studio = label & total
    case 'studio':
      param.map((item) => labels.push(item.label));
      param.map((item) => totals.push(item.total));
      bgColor = colors.slice(3, 13);
      borderColor = colors.slice(3, 13);
      labelName = 'Total Studios';
      break;
    default:
      param.map((item) => labels.push(item.label));
      param.map((item) => totals.push(item.total));
      bgColor = colors.slice(2, 13);
      borderColor = colors.slice(3, 13);
      labelName = 'Total';
      break;
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: labelName,
        data: totals,
        backgroundColor: bgColor,
        categoryPercentage: 0.8,
        barPercentage: 0.8,
        // borderColor: type == "song" ? "#888" : null,
        // borderWidth: type == "song" ? 1 : null,
      },
    ],
  };
  return data;
}

const options = {
  plugins: {
    legend: {
      labels: {
        font: {},
        color: '#888',
      },
    },
  },
};

function optionsLineChart(theme) {
  return {
    borderColor: 'rgba(4, 120, 200, 0.5)',
    borderWidth: 2,
    pointRadius: 7,
    pointBorderColor: 'rgba(4, 120, 200, 0)',
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#888',
        },
        grid: {
          color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
        },
      },
      y: {
        ticks: {
          color: '#888',
          stepSize: 1,
        },
        grid: {
          color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
        },
      },
    },
  };
}

function optionsBarChart(theme) {
  return {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#888',
        },
        grid: {
          color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
        },
      },
      y: {
        ticks: {
          color: '#888',
          stepSize: 1,
        },
        grid: {
          color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
        },
      },
    },
  };
}

function optionsHorizontalBarChart(theme, windowWidth) {
  return {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: '#888',
          stepSize: 1,
        },
        grid: {
          color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
        },
      },
      y: {
        ticks: {
          color: '#888',
          autoSkip: windowWidth > 500 ? false : true,
          // autoSkip: false,
          font: {
            size: 11,
          },
        },
        grid: {
          color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
        },
      },
    },
  };
}

export { populateData, options, optionsLineChart, optionsBarChart, optionsHorizontalBarChart };
