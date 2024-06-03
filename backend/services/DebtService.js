const Debt = require("../models/DebtModels");

exports.createDebt = async (debtData) => {
  const newDebt = new Debt(debtData);
  return newDebt.save();
};

exports.getDebtsByUserId = async (userId) => {
  return Debt.find({ userId, isDeleted: false });
};

exports.updateDebt = async (debtId, updateData) => {
  return Debt.findByIdAndUpdate(debtId, updateData, { new: true });
};

exports.deleteDebt = async (debtId) => {
  return Debt.findByIdAndUpdate(debtId, { isDeleted: true }, { new: true });
};
