const Expenditure = require("../models/ExpendituresModels");

exports.createExpenditure = async (expenditureData) => {
  const newExpenditure = new Expenditure(expenditureData);
  return newExpenditure.save();
};

exports.getExpendituresByUserId = async (userId) => {
  return Expenditure.find({ userId, isDeleted: false });
};

exports.updateExpenditure = async (expenditureId, updateData) => {
  return Expenditure.findByIdAndUpdate(expenditureId, updateData, {
    new: true,
  });
};

exports.deleteExpenditure = async (expenditureId) => {
  return Expenditure.findByIdAndUpdate(
    expenditureId,
    { isDeleted: true },
    { new: true }
  );
};
