const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const authRoutes = require("./routes/UserRoute");
const incomeRoutes = require("./routes/IncomeRoute");
const debtRoutes = require("./routes/DebtRoute");
const expenditureRoutes = require("./routes/ExpendituresRoute");
const plannedExpenditureRoutes = require("./routes/PlannedExpendituresRoute");

dotenv.config();

// Kết nối tới cơ sở dữ liệu
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api/debts", debtRoutes);
app.use("/api/expenditures", expenditureRoutes);
app.use("/api/plannedExpenditures", plannedExpenditureRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
