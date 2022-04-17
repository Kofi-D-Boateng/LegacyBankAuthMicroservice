"use-strict";
const router = require("express").Router();
const { userLogin } = require("../controllers/authentication/loginController");
const getRefreshToken = require("../controllers/authentication/refreshTokenController");
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
router.post("/refresh-token", getRefreshToken);
router.post("/transaction", authenticateTransaction);

module.exports = router;
