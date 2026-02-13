/**
 * Chart.js Configuration Generator for Financial Data
 *
 * Generates Chart.js configuration objects for common financial visualizations.
 * Handles currency formatting, date handling, and responsive design.
 */

/**
 * Generate a bar chart configuration for categorical spending data
 * @param {Object} params Configuration parameters
 * @param {string} params.title Chart title
 * @param {Array<string>} params.labels Category labels (e.g., ['Groceries', 'Dining', 'Transportation'])
 * @param {Array<number>} params.data Spending amounts (e.g., [450.32, 287.50, 156.00])
 * @param {string} params.currency Currency symbol (default: '$')
 * @returns {Object} Chart.js configuration object
 */
function generateBarChart({ title, labels, data, currency = '$' }) {
  return {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Spending',
        data: data,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
          font: { size: 16, weight: 'bold' }
        },
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return currency + context.parsed.y.toFixed(2);
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return currency + value.toFixed(0);
            }
          }
        }
      }
    }
  };
}

/**
 * Generate a line chart configuration for time-series spending data
 * @param {Object} params Configuration parameters
 * @param {string} params.title Chart title
 * @param {Array<string>} params.labels Date labels (e.g., ['Jan', 'Feb', 'Mar'])
 * @param {Array<number>} params.data Spending amounts over time
 * @param {string} params.currency Currency symbol (default: '$')
 * @param {Array<number>} params.budgetLine Optional budget line data
 * @returns {Object} Chart.js configuration object
 */
function generateLineChart({ title, labels, data, currency = '$', budgetLine = null }) {
  const datasets = [{
    label: 'Spending',
    data: data,
    borderColor: 'rgba(59, 130, 246, 1)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    tension: 0.3,
    fill: true
  }];

  if (budgetLine) {
    datasets.push({
      label: 'Budget',
      data: budgetLine,
      borderColor: 'rgba(239, 68, 68, 1)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderDash: [5, 5],
      tension: 0,
      fill: false
    });
  }

  return {
    type: 'line',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
          font: { size: 16, weight: 'bold' }
        },
        legend: {
          display: budgetLine !== null,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + currency + context.parsed.y.toFixed(2);
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return currency + value.toFixed(0);
            }
          }
        }
      }
    }
  };
}

/**
 * Generate a pie chart configuration for spending distribution
 * @param {Object} params Configuration parameters
 * @param {string} params.title Chart title
 * @param {Array<string>} params.labels Category labels
 * @param {Array<number>} params.data Spending amounts
 * @param {string} params.currency Currency symbol (default: '$')
 * @returns {Object} Chart.js configuration object
 */
function generatePieChart({ title, labels, data, currency = '$' }) {
  const total = data.reduce((sum, val) => sum + val, 0);

  return {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',   // Blue
          'rgba(16, 185, 129, 0.8)',   // Green
          'rgba(251, 146, 60, 0.8)',   // Orange
          'rgba(139, 92, 246, 0.8)',   // Purple
          'rgba(236, 72, 153, 0.8)',   // Pink
          'rgba(245, 158, 11, 0.8)',   // Amber
          'rgba(20, 184, 166, 0.8)',   // Teal
          'rgba(239, 68, 68, 0.8)'     // Red
        ],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
          font: { size: 16, weight: 'bold' }
        },
        legend: {
          display: true,
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.parsed;
              const percentage = ((value / total) * 100).toFixed(1);
              return context.label + ': ' + currency + value.toFixed(2) + ' (' + percentage + '%)';
            }
          }
        }
      }
    }
  };
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateBarChart,
    generateLineChart,
    generatePieChart
  };
}
