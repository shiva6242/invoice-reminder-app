import React, { useEffect, useState } from 'react';
import { fetchInvoices, triggerReminder, logout } from '../api';
import InvoiceList from '../components/InvoiceList';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const [invoices, setInvoices] = useState([]);
  console.log(user);

  useEffect(() => {
    fetchInvoices().then(setInvoices);
  }, []);

  const handleRemind = async (id) => {
    await triggerReminder(id);
    alert("Reminder sent!");
    fetchInvoices().then(setInvoices);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-welcome">Welcome, {user.name}</h2>
        <div className="dashboard-buttons">
          <button onClick={logout} className="logout-button">Logout</button>
          <button
  onClick={() => {
    const amount = Math.floor(1000 + Math.random() * 9000);

    const daysToAdd = Math.floor(Math.random() * 11) + 5;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + daysToAdd);

    fetch("http://localhost:5000/invoices/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recipientEmail: user.email,
        amount,
        dueDate: dueDate.toISOString(),
        customMessage: `Hey, this is a test invoice of ₹${amount} due on ${dueDate.toLocaleDateString()}.`
      })
    }).then(() => window.location.reload());
  }}
  className="add-invoice-button"
>
  Add Test Invoice
</button>

        </div>
      </div>

      <InvoiceList invoices={invoices} onRemind={handleRemind} />
    </div>
  );
};

export default Dashboard;
