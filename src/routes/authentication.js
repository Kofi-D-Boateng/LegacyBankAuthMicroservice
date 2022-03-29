"use-strict";
const router = require("express").Router();
const { userLogin } = require("../controllers/authentication/loginController");
const {
  userSignup,
} = require("../controllers/authentication/signupController");
const { userInfo } = require("../controllers/Profile/profileController");
const {
  authenticateTransaction,
} = require("../controllers/transactions/transactionController");

router.get("/profile/info", userInfo);

router.post("/registration", userSignup);
router.post("/login", userLogin);
router.post("/transaction", authenticateTransaction);

module.exports = router;
