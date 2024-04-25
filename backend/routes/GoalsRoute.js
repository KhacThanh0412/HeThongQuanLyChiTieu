const express = require("express");
const router = express.Router();
const goalController = require("../controllers/GoalsController");

router.post("/goal", goalController.createGoal);

module.exports = router;
