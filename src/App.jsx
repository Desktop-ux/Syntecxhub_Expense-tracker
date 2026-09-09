import { useCallback, useEffect, useMemo, useState } from "react";
import SummaryCards from "./components/SummaryCards";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import IncomeForm from "./components/IncomeForm";
import CategoryChart from "./components/CategoryChart";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [source, setSource] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeDate, setIncomeDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [expensesResponse, incomeResponse] = await Promise.all([
          fetch("http://localhost:5000/expenses"),
          fetch("http://localhost:5000/income"),
        ]);

        if (!expensesResponse.ok || !incomeResponse.ok) {
          throw new Error("Failed to fetch financial data");
        }

        const expensesData = await expensesResponse.json();
        const incomeData = await incomeResponse.json();

        setExpenses(expensesData);
        setIncome(incomeData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalIncome = useMemo(() => {
    return income.reduce(
      (total, item) => total + Number(item.amount),
      0
    );
  }, [income]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0
    );
  }, [expenses]);

  const categoryTotals = useMemo(() => {
    return expenses.reduce((categories, expense) => {
      const category = expense.category;

      categories[category] =
        (categories[category] || 0) + Number(expense.amount);

      return categories;
    }, {});
  }, [expenses]);

  const addExpense = useCallback(async () => {
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
      setError("");

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
  }, [description, amount, category, date]);

  const addIncome = useCallback(async () => {
    if (!source.trim() || !incomeAmount || !incomeDate) {
      return;
    }

    const newIncome = {
      source: source.trim(),
      amount: Number(incomeAmount),
      date: incomeDate,
    };

    try {
      setError("");

      const response = await fetch("http://localhost:5000/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIncome),
      });

      if (!response.ok) {
        throw new Error("Failed to add income");
      }

      const savedIncome = await response.json();

      setIncome((prevIncome) => [
        ...prevIncome,
        savedIncome,
      ]);

      setSource("");
      setIncomeAmount("");
      setIncomeDate("");
    } catch (error) {
      setError(error.message);
    }
  }, [source, incomeAmount, incomeDate]);

  const deleteExpense = useCallback(async (id) => {
    try {
      setError("");

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
  }, []);

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
          <div className="hero-content">
            <div>
              <h2>Dashboard</h2>
              <p>Track your expenses and manage your money.</p>
            </div>

            <div className="hero-expense-form">
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
            </div>
          </div>
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

          <div className="forms-column">
            <IncomeForm
              source={source}
              amount={incomeAmount}
              date={incomeDate}
              setSource={setSource}
              setAmount={setIncomeAmount}
              setDate={setIncomeDate}
              addIncome={addIncome}
            />

            <CategoryChart
              categoryTotals={categoryTotals}
              totalExpenses={totalExpenses}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;