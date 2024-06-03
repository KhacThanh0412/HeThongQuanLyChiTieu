const plannedExpenditureService = require("../services/PlannedExpendituresService");

// Controller function to handle creating a new planned expenditure
exports.createPlannedExpenditure = async (req, res) => {
  try {
    const plannedExpenditureData = req.body;
    const newPlannedExpenditure =
      await plannedExpenditureService.createPlannedExpenditure(
        plannedExpenditureData
      );
    res.status(201).json({
      message: "Planned expenditure created successfully",
      plannedExpenditure: newPlannedExpenditure,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to handle getting planned expenditures by user ID
exports.getPlannedExpendituresByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const plannedExpenditures =
      await plannedExpenditureService.getPlannedExpendituresByUserId(userId);
    res.status(200).json(plannedExpenditures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to handle updating a planned expenditure
exports.updatePlannedExpenditure = async (req, res) => {
  try {
    const { plannedExpenditureId } = req.params;
    const updateData = req.body;
    const updatedPlannedExpenditure =
      await plannedExpenditureService.updatePlannedExpenditure(
        plannedExpenditureId,
        updateData
      );
    res.status(200).json({
      message: "Planned expenditure updated successfully",
      plannedExpenditure: updatedPlannedExpenditure,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to handle deleting a planned expenditure
exports.deletePlannedExpenditure = async (req, res) => {
  try {
    const { plannedExpenditureId } = req.params;
    await plannedExpenditureService.deletePlannedExpenditure(
      plannedExpenditureId
    );
    res
      .status(200)
      .json({ message: "Planned expenditure deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
