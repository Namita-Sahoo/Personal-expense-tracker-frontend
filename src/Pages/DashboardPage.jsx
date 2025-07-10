import React, { useEffect, useState } from 'react';
import axios from 'axios';
import expenseImg from '../assets/images/expense-banner.jpg';
import foodImg from '../assets/images/food.jpg';
import travelImg from '../assets/images/travel.jpg';
import shoppingImg from '../assets/images/shopping.jpg';
import otherImg from '../assets/images/others.jpg';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

function DashboardPage() {
  
  const [expenses, setExpenses] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    fetchExpenses();
    fetchMonthlySummary();
  }, []);

  const fetchExpenses = () => {
    axios.get('http://localhost:5000/api/expenses')
      .then(res => setExpenses(res.data))
      .catch(err => console.log("Error fetching expenses:", err));
  };

  const fetchMonthlySummary = () => {
    axios.get('http://localhost:5000/api/expenses/monthly-summary')
      .then(res => setMonthlyData(res.data))
      .catch(err => console.log("Error fetching monthly summary:", err));
  };

  const totalAmount = expenses.reduce((total, item) => total + Number(item.amount), 0);
  const totalExpenses = expenses.length;

  const categoryTotals = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    return acc;
  }, {});

  const categoryData = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: amount,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5A5F', '#A28EFF'];

  const highestExpense = expenses.reduce((max, item) => {
    return item.amount > (max.amount || 0) ? item : max;
  }, {});

  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="dashboard-container">

      <div className="dashboard-top">
        <div className="dashboard-left">
          <img src={expenseImg} alt="Expense Tracker" className="dashboard-img" />
        </div>

        <div className="dashboard-right">
          <h2 style={{ marginBottom: '20px' }}>Dashboard</h2>

          <div className="metric-grid">
            <div className="metric-card total">
              <i className="fas fa-money-bill-wave metric-icon"></i>
              <h3>₹{totalAmount}</h3>
              <p>Total Money Spent</p>
            </div>

            <div className="metric-card highest">
              <i className="fas fa-trophy metric-icon"></i>
              <h3>₹{highestExpense.amount || 0}</h3>
              <p>Highest Single Expense</p>
            </div>

            <div className="metric-card count">
              <i className="fas fa-list metric-icon"></i>
              <h3>{totalExpenses}</h3>
              <p>Total Expenses</p>
            </div>
          </div>

          <div className="chart-grid">
            <div className="chart-card">
              <h3 style={{ textAlign: 'center' }}>Category Summary</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <defs>
                    {categoryData.map((entry, index) => (
                      <linearGradient id={`grad${index}`} key={index} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#333" stopOpacity={0.9} />
                      </linearGradient>
                    ))}
                  </defs>

                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name" cx="50%" cy="50%"
                    outerRadius={110} paddingAngle={4} cornerRadius={8} isAnimationActive={true}
                    label
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#grad${index})`} stroke="#fff" strokeWidth={1.5} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3 style={{ textAlign: 'center' }}>Monthly Spending</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#FF5A5F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

      <div className="dashboard-bottom">
        <h3 style={{ textAlign: 'center' }}>Recent Expenses</h3>
        <div className="card-container">
          {recentExpenses.length === 0 ? (
            <p>No recent expenses found.</p>
          ) : (
            recentExpenses.map(item => (
              <div key={item.id} className="expense-card">
                <img
                  src={
                    item.category === 'food'
                      ? foodImg
                      : item.category === 'travel'
                        ? travelImg
                        : item.category === 'shopping'
                          ? shoppingImg
                          : otherImg
                  }
                  alt={item.category}
                  className="expense-img"
                />
                <h4>{item.title}</h4>
                <p><strong>Amount:</strong> ₹{item.amount}</p>
                <p><strong>Date:</strong> {item.date}</p>
                <p><strong>Category:</strong> {item.category}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="fab-btn" onClick={() => window.location.href = '/add'}>
        <i className="fas fa-plus"></i>
      </div>

    </div>
  );
}

export default DashboardPage;
