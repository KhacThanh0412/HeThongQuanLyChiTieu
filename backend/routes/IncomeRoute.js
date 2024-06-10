const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/IncomeController");

// POST route for creating a new income
router.post("/add-income", incomeController.createIncome);

// GET route for getting incomes by user ID
router.get("/income/user/:userId", incomeController.getIncomesByUserId);

// PUT route for updating an income
router.put("/updateIncome/:incomeId", incomeController.updateIncome);

// DELETE route for deleting an income
router.delete("/income/:incomeId", incomeController.deleteIncome);

module.exports = router;
