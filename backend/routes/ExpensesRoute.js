const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/ExpensesController");

router.post("/expense", expenseController.createExpense);
router.get("/expenses", expenseController.getExpensesByUserId);

module.exports = router;
