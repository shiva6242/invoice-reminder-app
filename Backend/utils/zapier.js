const axios = require('axios');

exports.sendReminder = async (invoice) => {
  await axios.post(process.env.ZAPIER_WEBHOOK_URL, {
    recipientEmail: invoice.recipientEmail,
    amount: invoice.amount,
    dueDate: invoice.dueDate,
    message: invoice.customMessage || `Hi! Just a reminder, you owe $${invoice.amount} due on ${invoice.dueDate}`
  });
};
