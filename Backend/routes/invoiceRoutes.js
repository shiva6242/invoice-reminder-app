const express = require('express');
const router = express.Router();
const { getUnpaidInvoices, triggerZapierReminder, createInvoice } = require('../controllers/invoiceController');

router.get('/', getUnpaidInvoices); // GET unpaid invoices for logged-in user
router.post('/create', createInvoice); // Create a test invoice
router.post('/remind/:id', triggerZapierReminder); // Manually trigger Zapier

module.exports = router;
