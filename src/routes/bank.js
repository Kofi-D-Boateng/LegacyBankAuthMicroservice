"use-strict";
const router = require("express").Router();
const { getBankInfo } = require("../controllers/Bank/BankController");

router.get("/info", getBankInfo);

module.exports = router;
