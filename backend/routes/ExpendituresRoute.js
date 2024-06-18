const express = require("express");
const router = express.Router();
const expenditureController = require("../controllers/ExpendituresController");

// POST route for creating a new expenditure
router.post("/add-expenses", expenditureController.createExpenditure);

// GET route for getting expenditures by user ID
router.get("/expenses/user/:userId", expenditureController.getExpendituresByUserId);

// PUT route for updating an expenditure
router.put("/updateExpenses/:expenditureId", expenditureController.updateExpenditure);

// DELETE route for deleting an expenditure
router.delete("/deleteExpenses/:expenditureId", expenditureController.deleteExpenditure);

module.exports = router;
