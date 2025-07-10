import React, { useState } from 'react'
import axios from 'axios';

function AddExpense() {

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = { title,amount,date,category,notes};

    axios.post('http://localhost:5000/api/expenses', newExpense)
      .then(res => {
        console.log(res.data);
        setSuccess(true);

        setTitle('');
        setAmount('');
        setDate('');
        setCategory('');
        setNotes('');
      })
      .catch(err => {
        console.error("Error adding expense:", err);
      });
  };

  return (
    <div className='container1'>
      <h2>Add New Expense</h2>

      {success && <div className="success-msg">Expense Added Successfully!</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title :</label><br />
          <input type="text" value={title}
            onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div>
          <label>Amount (Rs.) :</label><br />
          <input type="number" value={amount}
            onChange={(e) => setAmount(e.target.value)} required />
        </div>

        <div>
          <label>Date :</label><br />
          <input type="date" value={date}
            onChange={(e) => setDate(e.target.value)} required />
        </div>

        <div>
          <label>Category :</label><br />
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label>Notes : (optional)</label><br />
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} ></textarea>
        </div>

        <button type="submit" className='primary-btn'>Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
