"use-strict";
const router = require("express").Router();
const { userLogin } = require("../controllers/authentication/loginController");
const getRefreshToken = require("../controllers/authentication/refreshTokenController");
const {
  userSignup,
} = require("../controllers/authentication/signupController");
const { billing } = require("../controllers/billing/billingController");
const { userInfo } = require("../controllers/Profile/profileController");
const {
  configureSecurity,
} = require("../controllers/security/securityController");
const {
  authenticateTransaction,
} = require("../controllers/transactions/transactionController");

router.get("/profile/info", userInfo);

router.post("/registration", userSignup);
router.post("/login", userLogin);
router.post("/billing", billing);
router.post("/profile/security", configureSecurity);
router.post("/refresh-token", getRefreshToken);
router.post("/transaction", authenticateTransaction);

module.exports = router;
