const userService = require('../services/UserService');

exports.createUser = async (req, res) => {
    try {
        // Logic để tạo người dùng mới
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};