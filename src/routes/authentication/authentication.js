"use-strict";
import express from "express";
import confirmAccount from "../../controllers/authentication/confirmAccountController.js";
import userLogin from "../../controllers/authentication/loginController.js";
import billing from "../../controllers/billing/billingController.js";
import configureSecurity from "../../controllers/security/securityController.js";
import getRefreshToken from "../../controllers/authentication/refreshTokenController.js";
import userInfo from "../../controllers/Profile/profileController.js";
import {
  userSignup,
  getConfirmationToken,
} from "../../controllers/authentication/signupController.js";
import authenticateTransaction from "../../controllers/transactions/transactionController.js";
import markNotification from "../../controllers/user_notifications/notificationsController.js";
const router = express.Router();

router.get("/profile/info", userInfo);
router.get("/confirm-account", confirmAccount);

router.post("/registration", userSignup);
router.post("/login", userLogin);
router.post("/billing", billing);
router.post("/profile/security", configureSecurity);
router.post("/refresh-token", getRefreshToken);
router.post("/transaction", authenticateTransaction);
router.post("/notifications", markNotification);

export default router;
