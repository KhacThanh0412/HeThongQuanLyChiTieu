const expenseService = require("../services/ExpensesService");

exports.createExpense = async (req, res) => {
  try {
    const expenseData = req.body;
    const newExpense = await expenseService.createExpense(expenseData);
    res
      .status(201)
      .json({ message: "Expense created successfully", expense: newExpense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExpensesByUserId = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy id của người dùng từ token
    const expenses = await expenseService.getExpensesByUserId(userId);
    res.status(200).json({ expenses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
