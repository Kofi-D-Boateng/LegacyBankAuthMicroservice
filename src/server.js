"use-strict";
// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const limiter = require("express-rate-limit");
const { version } = require("./config/configurations");

const app = express();
const PORT = 8081;

// ROUTE DEPENDENCIES
const AUTH = require("./routes/authentication");
const BANK = require("./routes/bank");

// WHITELIST
const WHITELIST = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

//MIDDLEWARE
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${WHITELIST.origin}`);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(logger("dev"));
app.use(express.json());

// ROUTES
app.use(`/api/${version}/authentication`, AUTH);
app.use(`/api/${version}/bank`, BANK);

app.listen(PORT | process.env, (err) => {
  if (!err) console.log(`Port running on port: ${PORT}`);
});
