const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  dateReceived: { type: Date, required: true },
  amountReceived: { type: Number, required: true },
  reason: { type: String, required: true },
  addedDateTime: { type: Date, default: Date.now },
  updatedDateTime: { type: Date, default: Date.now },
  typeReceviced: { type: String,  required: true },
  isDeleted: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Income", incomeSchema);
