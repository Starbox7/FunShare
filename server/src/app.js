const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const todoRoutes = require("./routes/todo.routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

module.exports = app;
