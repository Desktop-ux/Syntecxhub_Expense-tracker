import { useEffect, useRef } from "react";

function ExpenseForm({
  description,
  amount,
  category,
  date,
  editingId,
  setDescription,
  setAmount,
  setCategory,
  setDate,
  addExpense,
  updateExpense,
  clearForm,
}) {
  const descriptionInputRef = useRef(null);

  useEffect(() => {
    descriptionInputRef.current?.focus();
  }, [editingId]);

  const handleSubmit = async () => {
    if (editingId) {
      await updateExpense();
    } else {
      await addExpense();
    }

    descriptionInputRef.current?.focus();
  };

  return (
    <div className="expense-form">
      <h2>{editingId ? "Edit Expense" : "Add New Expense"}</h2>

      <input
        ref={descriptionInputRef}
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Others">Others</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <div className="expense-form-actions">
        <button onClick={handleSubmit}>
          {editingId ? "Update Expense" : "Add Expense"}
        </button>

        {editingId && (
          <button className="cancel-button" onClick={clearForm}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default ExpenseForm;