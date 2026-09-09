function SummaryCards({ totalIncome, totalExpenses }) {
  const balance = totalIncome - totalExpenses;

  return (
    <section className="summary-grid">
      <div className="summary-card">
        <div className="summary-icon">💰</div>
        <div>
          <p>Total Balance</p>
          <h3>₹{balance.toLocaleString("en-IN")}</h3>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon">📈</div>
        <div>
          <p>Total Income</p>
          <h3>₹{totalIncome.toLocaleString("en-IN")}</h3>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon">💸</div>
        <div>
          <p>Total Expenses</p>
          <h3>₹{totalExpenses.toLocaleString("en-IN")}</h3>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon">🏦</div>
        <div>
          <p>Savings</p>
          <h3>₹{balance.toLocaleString("en-IN")}</h3>
        </div>
      </div>
    </section>
  );
}

export default SummaryCards;