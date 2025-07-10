import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import DashboardPage from './Pages/DashboardPage'
import ExpensePage from './Pages/ExpensePage'
import AddExpense from './Pages/AddExpense'
import ExpenseDetailPage from './Pages/ExpenseDetailPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <nav className="navbar">
            <div className="nav-left">
              Personal Expense Tracker
            </div>
            <div className="nav-right">
              <Link to="/">Dashboard</Link>
              <Link to="/expense">Expenses</Link>
              <Link to="/add">Add Expense</Link>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/expense" element={<ExpensePage />} />
            <Route path="/add" element={<AddExpense />} />
            <Route path="/expense/:id" element={<ExpenseDetailPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
