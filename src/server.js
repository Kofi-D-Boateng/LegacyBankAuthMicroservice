"use-strict";
// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const limiter = require("express-rate-limit");
const { description } = require("./config/configurations");

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
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, authorization,x-forwarded-for, User-Agent"
  );
  next();
});
app.use(logger("dev"));
app.use(express.json());

// ROUTES
app.use(`/api/${description.version}/${description.purpose[0]}`, AUTH);
app.use(`/api/${description.version}/${description.purpose[1]}`, BANK);
app.listen(PORT | process.env, (err) => {
  if (!err) console.log(`Port running on port: ${PORT}`);
});
