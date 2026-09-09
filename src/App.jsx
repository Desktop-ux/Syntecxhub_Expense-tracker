import { useEffect, useState } from "react";
import SummaryCards from "./components/SummaryCards";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:5000/expenses");

        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }

        const data = await response.json();

        setExpenses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const totalIncome = 50000;

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const addExpense = () => {
    if (!description.trim() || !amount || !category || !date) {
      return;
    }

    const newExpense = {
      id: Date.now(),
      description: description.trim(),
      amount,
      category,
      date,
    };

    setExpenses((prevExpenses) => [
      ...prevExpenses,
      newExpense,
    ]);

    setDescription("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  const deleteExpense = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <span>💳</span>
          <h1>Expense Tracker</h1>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h2>Dashboard</h2>
          <p>Track your expenses and manage your money.</p>
        </section>

        <SummaryCards
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        <section className="main-grid">
          <ExpenseList
            expenses={expenses}
            deleteExpense={deleteExpense}
            loading={loading}
            error={error}
          />

          <ExpenseForm
            description={description}
            amount={amount}
            category={category}
            date={date}
            setDescription={setDescription}
            setAmount={setAmount}
            setCategory={setCategory}
            setDate={setDate}
            addExpense={addExpense}
          />
        </section>
      </main>
    </div>
  );
}

export default App;