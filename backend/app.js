const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const cors = require("cors");
const authRoutes = require("./routes/UserRoute");
const incomeRoutes = require("./routes/IncomeRoute");
const debtRoutes = require("./routes/DebtRoute");
const expenditureRoutes = require("./routes/ExpendituresRoute");
const plannedExpenditureRoutes = require("./routes/PlannedExpendituresRoute");
const { readdirSync } = require("fs");

dotenv.config();

// Kết nối tới cơ sở dữ liệu
connectDB();

app.use(express.json());
app.use(cors());

readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
