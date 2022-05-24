"use strict";
import "dotenv/config.js";
import express from "express";
import logger from "morgan";
import { rateLimit } from "express-rate-limit";
import _config from "./config/configurations.js";
const app = express();

// ROUTE DEPENDENCIES
import AUTH from "./routes/authentication/authentication.js";
import BANK from "./routes/bank/bank.js";
import LOGOUT from "./routes/logout/logout.js";

// WHITELIST
const WHITELIST = {
  origin: _config.CORS_ALLOW_ORIGINS,
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
app.use(`/${_config.API_VERSION}/${_config.PURPOSE[0]}`, AUTH);
app.use(`/${_config.API_VERSION}/${_config.PURPOSE[1]}`, BANK);
app.use(`/${_config.API_VERSION}/${_config.PURPOSE[2]}`, LOGOUT);

app.listen(_config.APP_PORT, (err) => {
  if (!err) console.log(`Port running on port: ${_config.APP_PORT}`);
});
