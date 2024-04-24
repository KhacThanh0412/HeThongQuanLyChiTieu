const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// POST route
router.post('/', userController.createUser);

module.exports = router;