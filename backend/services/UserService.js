const User = require('../models/UserModels');

exports.loginUser = async (email, password) => {
    return await User.findOne({ email, password });
};

exports.registerUser = async (username, email, password) => {
    const newUser = new User({ username, email, password });
    return await newUser.save();
};