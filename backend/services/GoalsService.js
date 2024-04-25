const Goal = require("../models/GoalsModel");

exports.createGoal = async (goalData) => {
  const newGoal = new Goal(goalData);
  return await newGoal.save();
};
