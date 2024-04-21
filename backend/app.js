const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConnection = require("./db/db");

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`${PORT}`);
});

dbConnection();
