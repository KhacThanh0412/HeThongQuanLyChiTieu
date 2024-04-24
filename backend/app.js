const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConnection = require("./db/db");
const authRoutes = require("./routes/UserRoute");

dotenv.config();

// Kết nối tới cơ sở dữ liệu
dbConnection();

// Sử dụng JSON middleware cho phân tích dữ liệu gửi đến từ client
app.use(express.json());

// Sử dụng route cho đăng nhập và đăng ký
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
