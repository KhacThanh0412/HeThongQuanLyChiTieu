const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// POST route for user registration
router.post('/register', userController.registerUser);

// POST route for user login
router.post('/login', userController.loginUser);

module.exports = router;