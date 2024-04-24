const userService = require('../services/UserService');

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userService.registerUser(username, email, password);
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};