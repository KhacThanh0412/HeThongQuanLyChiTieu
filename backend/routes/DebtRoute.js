const express = require("express");
const router = express.Router();
const debtController = require("../controllers/DebtController");

// POST route for creating a new debt
router.post("/", debtController.createDebt);

// GET route for getting debts by user ID
router.get("/user/:userId", debtController.getDebtsByUserId);

// PUT route for updating a debt
router.put("/:debtId", debtController.updateDebt);

// DELETE route for deleting a debt
router.delete("/:debtId", debtController.deleteDebt);

module.exports = router;
