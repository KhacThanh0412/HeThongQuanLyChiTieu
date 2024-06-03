const mongoose = require("mongoose");
const taxSchema = require("./TaxModels").schema;

const expendituresSchema = new mongoose.Schema({
  dateSpent: { type: Date, required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  amountSpent: { type: Number, required: true },
  taxes: [taxSchema],
  reason: { type: String },
  includeInReport: { type: Boolean, default: true },
  addedDateTime: { type: Date, default: Date.now },
  updatedDateTime: { type: Date, default: Date.now },
  comment: { type: String },
  currency: { type: String, default: "" },
  category: {
    type: String,
    enum: ["Education", "Entertainment", "Food", "Health", "None"],
    default: "None",
  },
  platformModel: { type: String },
  isDeleted: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Expenditure", expendituresSchema);
