const goalService = require("../services/GoalsService");

exports.createGoal = async (req, res) => {
  try {
    const goalData = req.body;
    const newGoal = await goalService.createGoal(goalData);
    res
      .status(201)
      .json({ message: "Goal created successfully", goal: newGoal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
