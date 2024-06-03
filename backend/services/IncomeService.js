const Income = require("../models/IncomeModels");

exports.createIncome = async (incomeData) => {
  const newIncome = new Income(incomeData);
  return newIncome.save();
};

exports.getIncomesByUserId = async (userId) => {
  return Income.find({ userId, isDeleted: false });
};

exports.updateIncome = async (incomeId, updateData) => {
  return Income.findByIdAndUpdate(incomeId, updateData, { new: true });
};

exports.deleteIncome = async (incomeId) => {
  return Income.findByIdAndUpdate(incomeId, { isDeleted: true }, { new: true });
};
