const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  group_id: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  category: String,
  amount: Number,
  date: Date,
  description: String,
});

module.exports = mongoose.model("Expenses", expensesSchema);
