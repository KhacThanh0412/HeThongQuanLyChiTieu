const express = require("express");
const router = express.Router();
const expenditureController = require("../controllers/ExpendituresController");

// POST route for creating a new expenditure
router.post("/", expenditureController.createExpenditure);

// GET route for getting expenditures by user ID
router.get("/user/:userId", expenditureController.getExpendituresByUserId);

// PUT route for updating an expenditure
router.put("/:expenditureId", expenditureController.updateExpenditure);

// DELETE route for deleting an expenditure
router.delete("/:expenditureId", expenditureController.deleteExpenditure);

module.exports = router;
