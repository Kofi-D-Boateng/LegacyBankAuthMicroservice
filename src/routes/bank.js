"use-strict";
var express = require("express");
const { getBankInfo } = require("../controllers/Bank/BankController");
var router = express.Router();

router.get("/info", getBankInfo);

module.exports = router;
