const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  dateReceived: { type: Date, required: true },
  amountReceived: { type: Number, required: true },
  reason: { type: String },
  addedDateTime: { type: Date, default: Date.now },
  updatedDateTime: { type: Date, default: Date.now },
  currency: { type: String, required: true },
  platformModel: { type: String },
  isDeleted: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Income", incomeSchema);
