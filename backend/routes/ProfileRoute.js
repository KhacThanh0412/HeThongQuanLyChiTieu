const express = require("express");
const router = express.Router();
const profileController = require("../controllers/ProfileController");

router.get("/profile", profileController.getUserProfile);
router.put("/profile", profileController.updateUserProfile);

module.exports = router;
