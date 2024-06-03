const incomeService = require("../services/IncomeService");

// Controller function to handle creating a new income
exports.createIncome = async (req, res) => {
  try {
    const incomeData = req.body;
    const newIncome = await incomeService.createIncome(incomeData);
    res
      .status(201)
      .json({ message: "Income created successfully", income: newIncome });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to handle getting incomes by user ID
exports.getIncomesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const incomes = await incomeService.getIncomesByUserId(userId);
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to handle updating an income
exports.updateIncome = async (req, res) => {
  try {
    const { incomeId } = req.params;
    const updateData = req.body;
    const updatedIncome = await incomeService.updateIncome(
      incomeId,
      updateData
    );
    res
      .status(200)
      .json({ message: "Income updated successfully", income: updatedIncome });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to handle deleting an income
exports.deleteIncome = async (req, res) => {
  try {
    const { incomeId } = req.params;
    const deletedIncome = await incomeService.deleteIncome(incomeId);
    res
      .status(200)
      .json({ message: "Income deleted successfully", income: deletedIncome });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
