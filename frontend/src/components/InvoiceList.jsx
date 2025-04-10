import React from 'react';
import './InvoiceList.css'; // ✅ Import the CSS file

const InvoiceList = ({ invoices, onRemind }) => {
  if (invoices.length === 0) return <p className="no-invoices">No unpaid invoices 🎉</p>;

  return (
    <div className="invoice-list">
      {invoices.map((inv) => (
        <div key={inv._id} className="invoice-card">
          <p><strong>Recipient:</strong> {inv.recipientEmail}</p>
    <p><strong>Amount:</strong> ₹{inv.amount}</p>
          <p><strong>Due:</strong> {new Date(inv.dueDate).toLocaleDateString()}</p>
          <p><strong>Reminder Sent:</strong> {inv.reminderSent ? '✅ Yes' : '❌ No'}</p>
          {inv.customMessage && (
            <p className="invoice-message">“{inv.customMessage}”</p>
          )}
          {!inv.reminderSent && (
            <button onClick={() => onRemind(inv._id)} className="reminder-button">
              Send Reminder
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
