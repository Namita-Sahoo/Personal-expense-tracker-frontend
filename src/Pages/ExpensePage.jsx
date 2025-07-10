import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import foodImg from '../assets/images/food.jpg';
import travelImg from '../assets/images/travel.jpg';
import shoppingImg from '../assets/images/shopping.jpg';
import otherImg from '../assets/images/others.jpg';

function ExpensePage() {

  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses ,setFilteredExpenses] =useState([]);

  //sort the expense by date new/oldest
  const[sortOrder ,setSortOrder] =useState('newest');

  //sort the expenses by category
  const[selectedCategory ,setSelectedCategory] =useState('');


  useEffect(() =>{
    fetchExpense();
  },[]);

  const fetchExpense =() =>{
    axios.get('http://localhost:5000/api/expenses')
    .then(res =>{
      setExpenses(res.data);
    })
    .catch(err =>{
      console.log("err while fetching the data from backend",err);
    });

  };

  useEffect( ()=>{
    let filtered =[...expenses];

    //Sort by date function
    filtered.sort((a,b) =>{
        if(sortOrder === 'newest'){
          return new Date(b.date) - new Date(a.date);
        }
        else{
          return new Date(a.date) - new Date(b.date);
        }
    });

    //sort by category
    if(selectedCategory)
    {
      filtered= filtered.filter(exp => exp.category === selectedCategory);
    }

    setFilteredExpenses(filtered);
  },[expenses,sortOrder,selectedCategory]);

  return (
    
    <div className="container">
      <h2>All Expenses</h2>
      <div className="filter-controls">

        <select value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}>

          <option value="">All Categories</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="shopping">Shopping</option>
          <option value="other">Other</option>
        </select>
        
        <select value={sortOrder}
          onChange={ (e) => setSortOrder(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {filteredExpenses.length === 0 ? ( <p>No expenses found yet.</p>) : 
      (

        <div className="card-container">
          {filteredExpenses.map(exp => (
            <div key={exp.id} className='expense-card'>
              
              <img
                src={
                  exp.category === 'food'
                    ? foodImg
                    : exp.category === 'travel'
                    ? travelImg
                    : exp.category === 'shopping'
                    ? shoppingImg
                    : otherImg
                }
                alt={exp.category}
                className="expense-img"
              />
              <h3>{exp.title}</h3>
              <p><strong>Amount:</strong> ₹{exp.amount}</p>
              <p><strong>Date:</strong> {exp.date}</p>
              <p><strong>Category:</strong> {exp.category}</p>
              <Link to={`/expense/${exp.id}`} className="view-btn">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>

  );
}

export default ExpensePage
