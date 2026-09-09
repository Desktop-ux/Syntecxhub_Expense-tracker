import { useEffect, useState } from "react";
import SummaryCards from "./components/SummaryCards";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalIncome = 50000;

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

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

  const addExpense = async () => {
    if (!description.trim() || !amount || !category || !date) {
      return;
    }

    const newExpense = {
      description: description.trim(),
      amount: Number(amount),
      category,
      date,
    };

    try {
      const response = await fetch("http://localhost:5000/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      const savedExpense = await response.json();

      setExpenses((prevExpenses) => [
        ...prevExpenses,
        savedExpense,
      ]);

      setDescription("");
      setAmount("");
      setCategory("");
      setDate("");
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/expenses/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
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