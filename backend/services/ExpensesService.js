const Expense = require("../models/ExpensesModel");

exports.createExpense = async (expenseData) => {
  const newExpense = new Expense(expenseData);
  return await newExpense.save();
};

exports.getExpensesByUserId = async (userId) => {
  return await Expense.find({ user_id: userId });
};
