const mongoose = require('mongoose');

const paymentsSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    expense_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Expenses' },
    amount: Number,
    date: Date
});

module.exports = mongoose.model('Payments', paymentsSchema);