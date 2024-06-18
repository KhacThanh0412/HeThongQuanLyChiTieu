const mongoose = require("mongoose");

const expendituresSchema = new mongoose.Schema({
  dateSpent: { type: Date, required: true },
  amountSpent: { type: Number, required: true },
  reason: { type: String, required: true },
  includeInReport: { type: Boolean, default: true },
  addedDateTime: { type: Date, default: Date.now },
  updatedDateTime: { type: Date, default: Date.now },
  description: { type: String, required: true },
  category: {
    type: String, required: true
  },
  isDeleted: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Expenditure", expendituresSchema);
