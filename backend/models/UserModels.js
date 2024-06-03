// models/UserModels.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savings: { type: Number, default: 0 },
  pocketMoney: { type: Number, default: 0 },
  totalExpendituresAmount: { type: Number, default: 0 },
  totalIncomeAmount: { type: Number, default: 0 },
  totalInDebtAmount: { type: Number, default: 0 },
  totalOutDebtAmount: { type: Number, default: 0 },
  dateTimeOfPocketMoneyUpdate: { type: Date, default: Date.now },
  taxes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tax" }],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
