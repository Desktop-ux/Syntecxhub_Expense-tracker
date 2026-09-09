function IncomeForm({
  source,
  amount,
  date,
  setSource,
  setAmount,
  setDate,
  addIncome,
}) {
  return (
    <div className="income-form">
      <h2>Add Income</h2>

      <input
        type="text"
        placeholder="Income source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={addIncome}>Add Income</button>
    </div>
  );
}

export default IncomeForm;