# Chart Type Selection Guide

Choose the appropriate chart type based on the user's question and the insights they need.

## Decision Tree

### Categorical Comparison ("Which category did I spend most on?")
**Use: Bar Chart**

Best for:
- Comparing spending across categories
- Showing top spending categories
- Comparing current vs. previous period by category

Example queries:
- "What are my biggest expenses?"
- "Show spending by category"
- "Compare my spending categories"

### Time-Series Trends ("How is my spending changing over time?")
**Use: Line Chart**

Best for:
- Showing spending trends over weeks/months
- Comparing to budget over time
- Identifying spending patterns and seasonality

Example queries:
- "Show my spending trends"
- "How has my spending changed over the year?"
- "Am I staying under budget each month?"

### Distribution/Proportions ("Where does my money go?")
**Use: Pie Chart**

Best for:
- Showing percentage breakdown of spending
- Visualizing budget allocation
- Understanding spending distribution

Example queries:
- "Where does my money go?"
- "What percentage do I spend on dining?"
- "Show my spending distribution"

## Quick Reference Table

| User Intent | Keywords | Chart Type | Aggregation |
|-------------|----------|------------|-------------|
| Compare categories | "biggest", "most", "compare categories" | Bar | By category |
| Track trends | "over time", "trends", "changing", "monthly" | Line | By month/week |
| See distribution | "where does", "percentage", "proportion" | Pie | By category |
| Budget tracking | "budget", "staying under", "on track" | Line | By month (with budget line) |
| Top spenders | "top", "highest", "rank" | Bar | By category (sorted) |

## Multi-Chart Scenarios

Sometimes a single chart isn't enough. Consider multiple charts for:

1. **Comprehensive Budget Review**
   - Pie chart: Overall distribution
   - Line chart: Monthly trends
   - Bar chart: Top categories

2. **Category Deep-Dive**
   - Line chart: Category trend over time
   - Bar chart: Comparison to other categories
   - Text insight: Percentage of total budget

3. **Budget Performance**
   - Line chart: Actual vs. budget over time
   - Bar chart: Over/under budget by category
   - Text insight: Total variance

## Chart Selection Algorithm

```
1. Identify the time span:
   - Single period (month/week) → Bar or Pie
   - Multiple periods → Line

2. Identify the comparison:
   - Categories → Bar or Pie
   - Time periods → Line
   - Actual vs. budget → Line (with two datasets)

3. Identify the insight:
   - "Which is highest?" → Bar (sorted)
   - "How is it changing?" → Line
   - "What's the breakdown?" → Pie

4. Default preference order:
   - For < 2 months of data → Bar or Pie
   - For ≥ 2 months of data → Line
   - For distribution questions → Pie
```
