const mongoose = require("mongoose");

const installmentPaymentsSchema = new mongoose.Schema({
  amountPaid: { type: Number, required: true },
  reasonForOptionalPayment: { type: String },
  datePaid: { type: Date, required: true, default: Date.now },
});

const personOrOrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String },
  email: { type: String },
});

const debtSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  debtType: { type: String, enum: ["Borrowed", "Lent"], default: "Lent" },
  personOrOrganization: { type: personOrOrganizationSchema, required: true },
  deadline: { type: Date },
  amountPaid: { type: Number, default: 0 },
  currency: { type: String, default: "" },
  notes: { type: String, default: "" },
  phoneAddress: { type: String, default: "" },
  datePaidCompletely: { type: Date },
  addedDateTime: { type: Date, default: Date.now },
  updateDateTime: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  platformModel: { type: String, default: "" },
  paymentAdvances: [installmentPaymentsSchema],
});

module.exports = mongoose.model("Debt", debtSchema);
