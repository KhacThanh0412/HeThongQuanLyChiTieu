const expenditureService = require("../services/ExpendituresService");

// Controller function to handle creating a new expenditure
exports.createExpenditure = async (req, res) => {
  try {
    const expenditureData = req.body;
    const newExpenditure = await expenditureService.createExpenditure(
      expenditureData
    );
    res.status(201).json({
      message: "Expenditure created successfully",
      expenditure: newExpenditure,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to handle getting expenditures by user ID
exports.getExpendituresByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const expenditures = await expenditureService.getExpendituresByUserId(
      userId
    );
    res.status(200).json(expenditures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to handle updating an expenditure
exports.updateExpenditure = async (req, res) => {
  try {
    const { expenditureId } = req.params;
    const updateData = req.body;
    const updatedExpenditure = await expenditureService.updateExpenditure(
      expenditureId,
      updateData
    );
    res.status(200).json({
      message: "Expenditure updated successfully",
      expenditure: updatedExpenditure,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to handle deleting an expenditure
exports.deleteExpenditure = async (req, res) => {
  try {
    const { expenditureId } = req.params;
    const deletedExpenditure = await expenditureService.deleteExpenditure(
      expenditureId
    );
    res.status(200).json({
      message: "Expenditure deleted successfully",
      expenditure: deletedExpenditure,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
