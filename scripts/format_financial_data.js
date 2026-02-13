/**
 * Financial Data Formatting Utilities
 *
 * Helper functions for preparing expense data for chart visualization.
 * Handles currency formatting, date parsing, and data aggregation.
 */

/**
 * Format a number as currency
 * @param {number} amount The amount to format
 * @param {string} currency Currency symbol (default: '$')
 * @param {number} decimals Number of decimal places (default: 2)
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currency = '$', decimals = 2) {
  return currency + amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Aggregate expenses by category
 * @param {Array<Object>} expenses Array of expense objects with {date, amount, category, description}
 * @returns {Object} Object with categories as keys and total amounts as values
 */
function aggregateByCategory(expenses) {
  return expenses.reduce((acc, expense) => {
    const category = expense.category || 'Other';
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});
}

/**
 * Aggregate expenses by month
 * @param {Array<Object>} expenses Array of expense objects with {date, amount, category, description}
 * @returns {Object} Object with month labels as keys and total amounts as values
 */
function aggregateByMonth(expenses) {
  return expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthLabel = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    acc[monthLabel] = (acc[monthLabel] || 0) + expense.amount;
    return acc;
  }, {});
}

/**
 * Aggregate expenses by week
 * @param {Array<Object>} expenses Array of expense objects with {date, amount, category, description}
 * @returns {Object} Object with week labels as keys and total amounts as values
 */
function aggregateByWeek(expenses) {
  return expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekLabel = weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    acc[weekLabel] = (acc[weekLabel] || 0) + expense.amount;
    return acc;
  }, {});
}

/**
 * Convert aggregated data to chart format
 * @param {Object} aggregated Object with labels as keys and values as amounts
 * @returns {Object} Object with {labels: Array<string>, data: Array<number>}
 */
function toChartFormat(aggregated) {
  const entries = Object.entries(aggregated);
  return {
    labels: entries.map(([label]) => label),
    data: entries.map(([, value]) => value)
  };
}

/**
 * Sort aggregated data by amount (descending)
 * @param {Object} aggregated Object with labels as keys and values as amounts
 * @returns {Object} Sorted object
 */
function sortByAmount(aggregated) {
  const sorted = Object.entries(aggregated)
    .sort(([, a], [, b]) => b - a)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  return sorted;
}

/**
 * Calculate percentage change between two values
 * @param {number} current Current value
 * @param {number} previous Previous value
 * @returns {number} Percentage change (e.g., 15.5 for 15.5% increase)
 */
function calculatePercentageChange(current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Get date range label
 * @param {string} startDate Start date (ISO format)
 * @param {string} endDate End date (ISO format)
 * @returns {string} Human-readable date range
 */
function formatDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
}

/**
 * Prepare expense data for visualization
 * @param {Array<Object>} expenses Raw expense data from cameron_get_expenses
 * @param {string} aggregationType Type of aggregation: 'category', 'month', 'week'
 * @param {boolean} sortByValue Whether to sort by amount (default: true)
 * @returns {Object} Chart-ready data with {labels, data, total}
 */
function prepareChartData(expenses, aggregationType = 'category', sortByValue = true) {
  let aggregated;

  switch (aggregationType) {
    case 'category':
      aggregated = aggregateByCategory(expenses);
      break;
    case 'month':
      aggregated = aggregateByMonth(expenses);
      break;
    case 'week':
      aggregated = aggregateByWeek(expenses);
      break;
    default:
      throw new Error(`Unknown aggregation type: ${aggregationType}`);
  }

  if (sortByValue && aggregationType === 'category') {
    aggregated = sortByAmount(aggregated);
  }

  const chartData = toChartFormat(aggregated);
  const total = chartData.data.reduce((sum, val) => sum + val, 0);

  return {
    ...chartData,
    total: total
  };
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatCurrency,
    aggregateByCategory,
    aggregateByMonth,
    aggregateByWeek,
    toChartFormat,
    sortByAmount,
    calculatePercentageChange,
    formatDateRange,
    prepareChartData
  };
}
