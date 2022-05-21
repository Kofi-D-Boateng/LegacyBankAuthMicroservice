"use-strict";
import express from "express";
import getBankInfo from "../../controllers/Bank/BankController.js";
const router = express.Router();

router.get("/info", getBankInfo);

export default router;
