# Chart.js Complete Examples

This file contains complete, working examples for each chart type with Cameron AI expense data.

## Table of Contents
- [Bar Chart: Category Spending](#bar-chart-category-spending)
- [Line Chart: Monthly Trends](#line-chart-monthly-trends)
- [Pie Chart: Spending Distribution](#pie-chart-spending-distribution)
- [Line Chart with Budget Line](#line-chart-with-budget-line)

---

## Bar Chart: Category Spending

**Use case**: User asks "What are my biggest expenses this month?"

### Complete HTML Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Category Spending</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; }
    .chart-container { position: relative; height: 400px; margin: 20px 0; }
    .insight { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Spending by Category - January 2025</h1>

    <div class="chart-container">
      <canvas id="categoryChart"></canvas>
    </div>

    <div class="insight">
      <strong>Key Insights:</strong>
      <ul>
        <li>Groceries ($450.32) is your highest expense category at 32% of total spending</li>
        <li>Dining ($287.50) represents 20% of your budget</li>
        <li>Total spending: $1,421.82 across 7 categories</li>
      </ul>
    </div>
  </div>

  <script>
    // Sample data from cameron_get_expenses
    const expenses = [
      { date: '2025-01-15', amount: 450.32, category: 'Groceries' },
      { date: '2025-01-16', amount: 287.50, category: 'Dining' },
      { date: '2025-01-17', amount: 156.00, category: 'Transportation' },
      { date: '2025-01-18', amount: 203.00, category: 'Entertainment' },
      { date: '2025-01-19', amount: 125.00, category: 'Utilities' },
      { date: '2025-01-20', amount: 95.00, category: 'Healthcare' },
      { date: '2025-01-21', amount: 105.00, category: 'Other' }
    ];

    // Aggregate by category
    const categoryTotals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    // Sort by amount
    const sorted = Object.entries(categoryTotals)
      .sort(([,a], [,b]) => b - a);

    const labels = sorted.map(([cat]) => cat);
    const data = sorted.map(([,amt]) => amt);

    // Create chart
    const ctx = document.getElementById('categoryChart').getContext('2d');
    new Chart(ctx, {
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
            text: 'Spending by Category',
            font: { size: 16, weight: 'bold' }
          },
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                return '$' + context.parsed.y.toFixed(2);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toFixed(0);
              }
            }
          }
        }
      }
    });
  </script>
</body>
</html>
```

---

## Line Chart: Monthly Trends

**Use case**: User asks "Show my spending trends over the last 6 months"

### Complete HTML Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Spending Trends</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; }
    .chart-container { position: relative; height: 400px; margin: 20px 0; }
    .insight { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Spending Trends - Last 6 Months</h1>

    <div class="chart-container">
      <canvas id="trendChart"></canvas>
    </div>

    <div class="insight">
      <strong>Key Insights:</strong>
      <ul>
        <li>Spending increased 15% from December ($1,200) to January ($1,380)</li>
        <li>Average monthly spending: $1,285</li>
        <li>Highest month: November ($1,450)</li>
        <li>Lowest month: September ($1,150)</li>
      </ul>
    </div>
  </div>

  <script>
    // Sample monthly aggregated data
    const monthlyData = {
      'Aug 2024': 1200,
      'Sep 2024': 1150,
      'Oct 2024': 1320,
      'Nov 2024': 1450,
      'Dec 2024': 1200,
      'Jan 2025': 1380
    };

    const labels = Object.keys(monthlyData);
    const data = Object.values(monthlyData);

    const ctx = document.getElementById('trendChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Spending',
          data: data,
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Spending Trends',
            font: { size: 16, weight: 'bold' }
          },
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                return 'Spending: $' + context.parsed.y.toFixed(2);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toFixed(0);
              }
            }
          }
        }
      }
    });
  </script>
</body>
</html>
```

---

## Pie Chart: Spending Distribution

**Use case**: User asks "Where does my money go?"

### Complete HTML Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Spending Distribution</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 20px; }
    .container { max-width: 900px; margin: 0 auto; }
    .chart-container { position: relative; height: 500px; margin: 20px 0; }
    .insight { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Spending Distribution - January 2025</h1>

    <div class="chart-container">
      <canvas id="pieChart"></canvas>
    </div>

    <div class="insight">
      <strong>Key Insights:</strong>
      <ul>
        <li>Essential expenses (Groceries, Utilities, Healthcare) account for 47% of spending</li>
        <li>Discretionary spending (Dining, Entertainment) represents 34%</li>
        <li>Top category: Groceries at 32% of total budget</li>
      </ul>
    </div>
  </div>

  <script>
    const categoryData = {
      'Groceries': 450.32,
      'Dining': 287.50,
      'Entertainment': 203.00,
      'Transportation': 156.00,
      'Utilities': 125.00,
      'Other': 105.00,
      'Healthcare': 95.00
    };

    const labels = Object.keys(categoryData);
    const data = Object.values(categoryData);
    const total = data.reduce((sum, val) => sum + val, 0);

    const ctx = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(251, 146, 60, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(20, 184, 166, 0.8)'
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
            text: 'Spending Distribution',
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
                return context.label + ': $' + value.toFixed(2) + ' (' + percentage + '%)';
              }
            }
          }
        }
      }
    });
  </script>
</body>
</html>
```

---

## Line Chart with Budget Line

**Use case**: User asks "Am I staying under my $1,500 monthly budget?"

### Complete HTML Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Budget Tracking</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; }
    .chart-container { position: relative; height: 400px; margin: 20px 0; }
    .insight { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; }
    .insight.warning { background: #fef3c7; border-left: 4px solid #f59e0b; }
    .insight.success { background: #d1fae5; border-left: 4px solid #10b981; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Budget Tracking - Last 6 Months</h1>

    <div class="chart-container">
      <canvas id="budgetChart"></canvas>
    </div>

    <div class="insight warning">
      <strong>Budget Status:</strong>
      <ul>
        <li>You exceeded budget in 2 out of 6 months (October, November)</li>
        <li>Average overspending: $50/month when over budget</li>
        <li>January spending: $1,380 - under budget by $120 ✓</li>
        <li>Recommendation: Watch spending in Entertainment and Dining categories</li>
      </ul>
    </div>
  </div>

  <script>
    const monthlyData = {
      'Aug 2024': 1200,
      'Sep 2024': 1150,
      'Oct 2024': 1520,  // Over budget
      'Nov 2024': 1580,  // Over budget
      'Dec 2024': 1200,
      'Jan 2025': 1380
    };

    const budget = 1500;
    const labels = Object.keys(monthlyData);
    const spending = Object.values(monthlyData);
    const budgetLine = new Array(labels.length).fill(budget);

    const ctx = document.getElementById('budgetChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Actual Spending',
            data: spending,
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Budget ($1,500)',
            data: budgetLine,
            borderColor: 'rgba(239, 68, 68, 1)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderDash: [5, 5],
            tension: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Actual Spending vs. Budget',
            font: { size: 16, weight: 'bold' }
          },
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': $' + context.parsed.y.toFixed(2);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toFixed(0);
              }
            }
          }
        }
      }
    });
  </script>
</body>
</html>
```

---

## Usage Notes

1. **Chart.js CDN**: All examples use Chart.js v4.4.0 from CDN. You can also install via npm: `npm install chart.js`

2. **Responsive Design**: All charts use `responsive: true` and `maintainAspectRatio: false` with container height set to 400px for consistent sizing

3. **Currency Formatting**: The `tooltip` and `scales.y.ticks` callbacks format numbers as USD with proper decimal places

4. **Color Scheme**: Uses Tailwind CSS color palette (blue-500 primary, red-500 for budget warnings)

5. **Data Source**: Replace sample data with actual data from `cameron_get_expenses()` tool

6. **Customization**: Adjust colors, fonts, and dimensions in the chart options and CSS styles as needed
