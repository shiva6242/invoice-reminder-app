const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipientEmail: String,
  amount: Number,
  dueDate: Date,
  status: { type: String, default: 'unpaid' }, // unpaid, paid
  reminderSent: { type: Boolean, default: false },
  customMessage: { type: String, default: '' }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
