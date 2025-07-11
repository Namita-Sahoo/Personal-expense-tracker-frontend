import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import foodImg from '../assets/images/food.jpg';
import travelImg from '../assets/images/travel.jpg';
import shoppingImg from '../assets/images/shopping.jpg';
import otherImg from '../assets/images/others.jpg';


function ExpenseDetailPage() {

  const [expense ,setExpense] =useState(null);
  const {id} = useParams();     //to  get id from Url
  const navigate = useNavigate();        //to redirect after delete


  useEffect( () =>{
    fetchExpenseDetails();
  }, []);

  const fetchExpenseDetails = () => {
    axios.get(`https://personal-expense-tracker-backend-m3i0.onrender.com/api/expenses/${id}`)
      .then(res => {
        setExpense(res.data);
      })
      .catch(err => {
        console.log("Error fetching expense details:", err);
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      axios.delete(`https://personal-expense-tracker-backend-m3i0.onrender.com/api/expenses/${id}`)
        .then(() => {
          alert("Expense deleted successfully!");
          navigate('/expense');
        })
        .catch(err => {
          console.log("Error deleting expense:", err);
        });
    }
  };

  if (!expense) {
    return <div className="container"><p>Loading expense details...</p></div>;
  }

 return (
    <div className="container1">
      <h2>Expense Details</h2>
      <div className="expense-card">
        <h3>{expense.title}</h3>

        <img
          src={
            expense.category === 'food'
              ? foodImg
              : expense.category === 'travel'
              ? travelImg
              : expense.category === 'shopping'
              ? shoppingImg
              : otherImg
          }
          alt={expense.category}
          className="expense-img"
        />
        <p><strong>Amount:</strong> ₹{expense.amount}</p>
        <p><strong>Date:</strong> {expense.date}</p>
        <p><strong>Category:</strong> {expense.category}</p>
        <p><strong>Notes:</strong> {expense.notes || 'No notes'}</p>

        <button className="danger-btn" onClick={handleDelete}>Delete Expense</button>
      </div>
    </div>
  );
}

export default ExpenseDetailPage
