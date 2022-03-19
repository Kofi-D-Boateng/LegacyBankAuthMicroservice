"use-strict";
require("dotenv").config();
const express = require("express");
const app = express();

const PORT = 8081;

app.listen(PORT | process.env, (err) => {
  if (!err) console.log(`Port running on port: ${PORT}`);
});
