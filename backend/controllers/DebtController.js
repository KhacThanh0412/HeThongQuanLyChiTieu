const debtService = require("../services/DebtService");

// Controller function to handle creating a new debt
exports.createDebt = async (req, res) => {
  try {
    const debtData = req.body;
    const newDebt = await debtService.createDebt(debtData);
    res
      .status(201)
      .json({ message: "Debt created successfully", debt: newDebt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to handle getting debts by user ID
exports.getDebtsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const debts = await debtService.getDebtsByUserId(userId);
    res.status(200).json(debts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to handle updating a debt
exports.updateDebt = async (req, res) => {
  try {
    const { debtId } = req.params;
    const updateData = req.body;
    const updatedDebt = await debtService.updateDebt(debtId, updateData);
    res
      .status(200)
      .json({ message: "Debt updated successfully", debt: updatedDebt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to handle deleting a debt
exports.deleteDebt = async (req, res) => {
  try {
    const { debtId } = req.params;
    const deletedDebt = await debtService.deleteDebt(debtId);
    res
      .status(200)
      .json({ message: "Debt deleted successfully", debt: deletedDebt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
