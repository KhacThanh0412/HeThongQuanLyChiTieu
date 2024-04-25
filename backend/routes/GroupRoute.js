const express = require("express");
const router = express.Router();
const groupController = require("../controllers/GroupController");

router.post("/group/create", groupController.createGroup);
router.post("/group/add-member", groupController.addMemberToGroup);
router.post("/group/set-lead", groupController.setLead);
router.post("/group/add-goal", groupController.addGoalToGroup);

module.exports = router;
