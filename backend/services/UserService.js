// services/UserService.js
const User = require('../models/UserModels');

// Service function to find user by username
exports.findUserByUsername = async (username) => {
    return await User.findOne({ username });
};

// Service function to create a new user
exports.createUser = async (username, email, password) => {
    const newUser = new User({ username, email, password });
    return await newUser.save();
};

// Service function to find user by email and password for login
exports.loginUser = async (email, password) => {
    return await User.findOne({ email, password });
};