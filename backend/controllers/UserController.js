// controllers/UserController.js
const userService = require("../services/UserService");

// Controller function to handle user registration
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Kiểm tra xem tên người dùng đã tồn tại chưa
    const existingUser = await userService.findUserByUsername(email);
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    // Tạo người dùng mới
    const newUser = await userService.createUser(username, email, password);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to handle user login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Tìm người dùng theo email và password
    const user = await userService.loginUser(email, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
