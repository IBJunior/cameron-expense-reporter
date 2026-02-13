---
name: cameron-expense-reporter
description: Generate financial reports with charts using Chart.js. Use when users ask to visualize spending, show trends, create expense charts, analyze spending patterns, compare categories, track budget progress, or generate financial reports. Handles chart type selection (bar/line/pie), data formatting (currency, dates, aggregation), Chart.js configuration, and insight generation. Works with expense data from tools like cameron_get_expenses or similar financial data sources.
---

# Cameron Expense Reporter

Generate beautiful, insightful financial reports with charts and written analysis. Transform raw expense data into actionable visualizations using Chart.js.

## Workflow

### Step 1: Understand the Request

Identify the user's intent to select the appropriate visualization:

**Category comparison** ("biggest expenses", "compare categories")
→ Use bar chart with category aggregation

**Time-series trends** ("spending over time", "monthly trends", "changing")
→ Use line chart with temporal aggregation (month/week)

**Distribution/proportions** ("where does money go", "percentage breakdown")
→ Use pie chart with category aggregation

**Budget tracking** ("staying under budget", "on track")
→ Use line chart with budget reference line

**Comprehensive review** ("full report", "complete analysis")
→ Use multiple charts (pie + line, or bar + line)

For detailed chart selection guidance, see [references/chart-types-guide.md](references/chart-types-guide.md).

### Step 2: Gather Expense Data

Use the `cameron_get_expenses` tool (or other financial data source) to retrieve relevant data:

```
cameron_get_expenses(
  start_date: "YYYY-MM-DD",
  end_date: "YYYY-MM-DD",
  category: optional,
  response_format: "concise",  // Use concise for chart data
  limit: 500  // Increase if needed for comprehensive reports
)
```

**Date range selection:**
- For "this month" → First day to today of current month
- For "last month" → Full previous month
- For "last 3 months" → First day 3 months ago to today
- For "this year" → January 1st to today

**Category filtering:**
- Only filter by category for category-specific deep-dives
- For overview charts, retrieve all categories

### Step 3: Prepare and Format Data

Use the helper scripts for data transformation:

**Load the formatting utilities:**
```javascript
// Read and use scripts/format_financial_data.js
```

**Aggregate data based on chart type:**
- **Bar/Pie charts** → Aggregate by category using `aggregateByCategory()`
- **Line charts (short term)** → Aggregate by week using `aggregateByWeek()`
- **Line charts (long term)** → Aggregate by month using `aggregateByMonth()`

**Sort data appropriately:**
- **Bar charts** → Sort by amount (highest first) using `sortByAmount()`
- **Pie charts** → Sort by amount (highest first)
- **Line charts** → Sort chronologically (automatic)

**Convert to chart format:**
```javascript
const chartData = prepareChartData(expenses, 'category', true);
// Returns: { labels: [...], data: [...], total: number }
```

### Step 4: Generate Chart Configuration

Use the helper scripts to create Chart.js configurations:

**Load the chart generator:**
```javascript
// Read and use scripts/generate_chart_config.js
```

**Bar chart example:**
```javascript
const config = generateBarChart({
  title: 'Spending by Category',
  labels: chartData.labels,
  data: chartData.data,
  currency: '$'
});
```

**Line chart example:**
```javascript
const config = generateLineChart({
  title: 'Monthly Spending Trends',
  labels: monthLabels,
  data: monthlyAmounts,
  currency: '$',
  budgetLine: [1500, 1500, 1500, ...]  // Optional
});
```

**Pie chart example:**
```javascript
const config = generatePieChart({
  title: 'Spending Distribution',
  labels: categories,
  data: amounts,
  currency: '$'
});
```

For complete working examples with HTML, see [references/chartjs-examples.md](references/chartjs-examples.md).

### Step 5: Generate Insights

Provide written analysis alongside the chart. Good insights should:

**Highlight key findings:**
- Top spending category and its percentage
- Notable trends (increases/decreases)
- Budget status (over/under)
- Anomalies or surprises

**Use specific numbers:**
```
✓ "Dining ($287.50) increased 15% vs last month"
✗ "You spent more on dining"
```

**Provide context:**
```
✓ "Groceries ($450) represents 32% of total spending, within your 35% target"
✗ "You spent $450 on groceries"
```

**Offer actionable recommendations when appropriate:**
```
"Consider setting a $300 monthly limit for dining expenses to stay on track with your savings goal"
```

**Calculate useful metrics:**
- Percentage change: Use `calculatePercentageChange(current, previous)`
- Category percentage: `(categoryAmount / total) * 100`
- Average: `total / numberOfPeriods`

### Step 6: Compose the Report

**Option A: Generate complete HTML report**

Use the template from `assets/report-template.html`:

1. Read the template file
2. Replace placeholders with actual data:
   - `{{REPORT_TITLE}}` → "January 2025 Expense Report"
   - `{{DATE_RANGE}}` → "January 1 - 31, 2025"
   - `{{SUMMARY_STATS}}` → HTML for stat cards (total, average, categories)
   - `{{CHART_1_TITLE}}` → "Spending by Category"
   - `{{INSIGHTS_1}}` → `<li>` items with key insights
   - `{{CHART_SCRIPTS}}` → JavaScript to render Chart.js charts
   - `{{GENERATION_DATE}}` → Current date

3. Write to a new HTML file (e.g., `expense-report-jan-2025.html`)

**Option B: Generate markdown report with chart embed**

For tools that support Chart.js rendering or when creating notebook-style reports:

```markdown
# Expense Report - January 2025

## Summary
- Total Spending: $1,421.82
- Number of Categories: 7
- Average per day: $47.39

## Spending by Category

[Chart.js bar chart here]

### Key Insights
- Groceries ($450.32) is your highest expense at 32%
- Dining ($287.50) represents 20% of budget
- Essential expenses account for 47% of spending
```

**Option C: Interactive inline visualization**

For environments that support inline JavaScript execution, render the chart directly in the response.

## Chart Selection Quick Reference

| User Query Contains | Chart Type | Aggregation | Sort |
|---------------------|------------|-------------|------|
| "biggest", "most", "top" | Bar | Category | By amount ↓ |
| "over time", "trend", "monthly" | Line | Month/Week | Chronological |
| "where does", "percentage", "distribution" | Pie | Category | By amount ↓ |
| "budget", "on track" | Line | Month | Chronological + budget line |
| "compare" + categories | Bar | Category | By amount ↓ |
| "full report", "complete" | Multiple | Various | Context-dependent |

## Common Patterns

### Pattern 1: Simple Category Breakdown
```
User: "What are my biggest expenses this month?"

1. Get current month expenses (all categories)
2. Aggregate by category
3. Generate bar chart (sorted by amount)
4. Provide insights: top 3 categories + percentages
```

### Pattern 2: Budget Tracking
```
User: "Am I staying under my $1,500 budget?"

1. Get expenses for target period(s)
2. Aggregate by month
3. Generate line chart with budget reference line
4. Calculate variance and provide insights
```

### Pattern 3: Comprehensive Report
```
User: "Give me a full spending report"

1. Get expenses for period (e.g., last 3 months)
2. Create multiple charts:
   - Pie: Overall distribution
   - Line: Monthly trends
   - Bar: Top categories current month
3. Generate insights for each chart
4. Use HTML template for professional output
```

## Best Practices

**Data preparation:**
- Always validate date ranges before querying
- Handle empty results gracefully
- Round currency to 2 decimal places for display

**Chart configuration:**
- Use consistent color scheme (blue primary, red for budget warnings)
- Set responsive: true for all charts
- Include proper axis labels and tooltips
- Format currency in tooltips and axis ticks

**Insight generation:**
- Lead with the most important finding
- Use concrete numbers, not vague language
- Provide context (percentages, comparisons)
- Keep insights concise (3-5 bullet points)

**Performance:**
- For large datasets (>1000 expenses), aggregate before visualizing
- Use `response_format: 'concise'` when fetching data for charts
- Consider pagination for very long time ranges

## Troubleshooting

**"No data found"**
→ Verify date range is correct and tool returned results

**Chart not rendering**
→ Ensure Chart.js CDN is included and labels/data arrays match in length

**Insights feel generic**
→ Calculate specific metrics (percentages, changes) and use actual numbers

**Too much data**
→ Narrow date range, filter by category, or aggregate at higher level (weekly → monthly)

## Resources

- Chart generation: [scripts/generate_chart_config.js](scripts/generate_chart_config.js)
- Data formatting: [scripts/format_financial_data.js](scripts/format_financial_data.js)
- Chart selection: [references/chart-types-guide.md](references/chart-types-guide.md)
- Complete examples: [references/chartjs-examples.md](references/chartjs-examples.md)
- HTML template: [assets/report-template.html](assets/report-template.html)
