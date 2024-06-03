const PlannedExpenditure = require("../models/PlannedExpendituresModel");

exports.createPlannedExpenditure = async (plannedExpenditureData) => {
  const newPlannedExpenditure = new PlannedExpenditure(plannedExpenditureData);
  return newPlannedExpenditure.save();
};

exports.getPlannedExpendituresByUserId = async (userId) => {
  return PlannedExpenditure.find({ userId });
};

exports.updatePlannedExpenditure = async (plannedExpenditureId, updateData) => {
  return PlannedExpenditure.findByIdAndUpdate(
    plannedExpenditureId,
    updateData,
    { new: true }
  );
};

exports.deletePlannedExpenditure = async (plannedExpenditureId) => {
  return PlannedExpenditure.findByIdAndDelete(plannedExpenditureId);
};
