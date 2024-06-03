const mongoose = require("mongoose");

const plannedExpendituresSchema = new mongoose.Schema({
  title: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  comment: { type: String },
  numberOfExpenditures: { type: Number, required: true },
  isMonthlyPlanned: { type: Boolean, required: true },
  addedDateTime: { type: Date, default: Date.now },
  updatedDateTime: { type: Date, default: Date.now },
  currency: { type: String, required: true },
  platformModel: { type: String },
  updateOnSync: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expenditures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expenditure" }],
});

module.exports = mongoose.model(
  "PlannedExpenditure",
  plannedExpendituresSchema
);
