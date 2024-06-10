const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// POST route for user registration
router.post("/auth/register", userController.registerUser);

// POST route for user login
router.post("/auth/login", userController.loginUser);

router.get("/auth/users", userController.getAllUsers);

module.exports = router;
