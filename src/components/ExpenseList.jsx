function ExpenseList({
  expenses,
  deleteExpense,
  loading,
  error,
}) {
  return (
    <div className="expense-list">
      <div className="section-heading">
        <h2>Recent Expenses</h2>
        <span>{expenses.length} transactions</span>
      </div>

      {loading ? (
        <div className="empty-expenses">
          <h3>Loading expenses...</h3>
          <p>Please wait while we fetch your data.</p>
        </div>
      ) : error ? (
        <div className="empty-expenses">
          <h3>Something went wrong</h3>
          <p>{error}</p>
        </div>
      ) : 
        expenses.length === 0 ? (
          <div className="empty-expenses">
            <h3>No expenses yet</h3>
            <p>Add your first expense to get started.</p>
          </div>
        ) : (
          expenses.map((expense) => (
            <div className="expense-item" key={expense.id}>
              <div>
                <h3>{expense.description}</h3>
                <p>
                  {expense.category} • {expense.date}
                </p>
              </div>

              <div className="expense-right">
                <strong>
                  ₹{Number(expense.amount).toLocaleString("en-IN")}
                </strong>

                <button onClick={() => deleteExpense(expense.id)}>
                  🗑️
                </button>
              </div>
            </div>
          ))
        )
      }
    </div>
  );
}

export default ExpenseList;