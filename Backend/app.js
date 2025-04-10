const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('./config/db');
require('./utils/passportSetup');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
const cron = require('node-cron');
const Invoice = require('./models/Invoice');
const zapier = require('./utils/zapier');

cron.schedule('0 9 * * *', async () => {
  console.log('⏰ Running daily reminder check...');
  const today = new Date();

  const overdueInvoices = await Invoice.find({
    dueDate: { $lt: today },
    status: 'unpaid',
    reminderSent: false
  });

  for (const invoice of overdueInvoices) {
    await zapier.sendReminder(invoice);
    invoice.reminderSent = true;
    await invoice.save();
  }

  console.log(`✅ Reminders sent for ${overdueInvoices.length} overdue invoices.`);
});

app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/authRoutes'));
app.use('/invoices', require('./routes/invoiceRoutes'));

module.exports = app;
