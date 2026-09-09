function CategoryChart({ categoryTotals, totalExpenses }) {
  const categories = Object.entries(categoryTotals);

  if (categories.length === 0) {
    return (
      <div className="category-chart">
        <div className="chart-heading">
          <h2>Spending Breakdown</h2>
        </div>

        <div className="chart-empty">
          <p>Add expenses to see your spending breakdown.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="category-chart">
      <div className="chart-heading">
        <h2>Spending Breakdown</h2>
        <span>₹{totalExpenses.toLocaleString("en-IN")}</span>
      </div>

      <div className="category-list">
        {categories.map(([category, amount]) => {
          const percentage =
            totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;

          return (
            <div className="category-item" key={category}>
              <div className="category-info">
                <span>{category}</span>
                <strong>
                  ₹{amount.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="category-bar">
                <div
                  className="category-bar-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <small>{percentage.toFixed(0)}%</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryChart;