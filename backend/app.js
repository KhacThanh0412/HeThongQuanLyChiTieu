const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const authRoutes = require("./routes/UserRoute");
const expenseRoutes = require("./routes/ExpensesRoute");
const categoryRoutes = require("./routes/CategoriesRoute");
const goalRoutes = require("./routes/GoalsRoute");
const paymentRoutes = require("./routes/PaymentsRoute");
const profileRoutes = require("./routes/ProfileRoute");
const groupRoutes = require("./routes/GroupRoute");

dotenv.config();

// Kết nối tới cơ sở dữ liệu
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/groups", groupRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
