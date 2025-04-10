const Invoice = require('../models/Invoice');
const zapier = require('../utils/zapier');

// Fetch unpaid invoices
exports.getUnpaidInvoices = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const invoices = await Invoice.find({ userId: req.user._id, status: 'unpaid' });
  res.json(invoices);
};

// Create an invoice (test/demo)
exports.createInvoice = async (req, res) => {
  const { recipientEmail, amount, dueDate, customMessage } = req.body;
  const invoice = new Invoice({
    userId: req.user._id,
    recipientEmail,
    amount,
    dueDate,
    customMessage
  });
  await invoice.save();
  res.json(invoice);
};

// Trigger Zapier webhook for a single invoice
exports.triggerZapierReminder = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

  await zapier.sendReminder(invoice);
  invoice.reminderSent = true;
  await invoice.save();
  res.json({ message: 'Zapier reminder sent' });
};
