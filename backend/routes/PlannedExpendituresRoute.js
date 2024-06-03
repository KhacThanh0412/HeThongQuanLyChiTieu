const express = require("express");
const router = express.Router();
const plannedExpenditureController = require("../controllers/PlannedExpendituresController");

// POST route for creating a new planned expenditure
router.post("/", plannedExpenditureController.createPlannedExpenditure);

// GET route for getting planned expenditures by user ID
router.get(
  "/user/:userId",
  plannedExpenditureController.getPlannedExpendituresByUserId
);

// PUT route for updating a planned expenditure
router.put(
  "/:plannedExpenditureId",
  plannedExpenditureController.updatePlannedExpenditure
);

// DELETE route for deleting a planned expenditure
router.delete(
  "/:plannedExpenditureId",
  plannedExpenditureController.deletePlannedExpenditure
);

module.exports = router;
