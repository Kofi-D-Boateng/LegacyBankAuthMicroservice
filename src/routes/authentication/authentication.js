"use-strict";
import express from "express";
import {
  confirmAccount,
  newVerificationLink,
} from "../../controllers/authentication/confirmAccountController.js";
import userLogin from "../../controllers/authentication/loginController.js";
import billing from "../../controllers/billing/billingController.js";
import configureSecurity from "../../controllers/security/securityController.js";
import getRefreshToken from "../../controllers/authentication/refreshTokenController.js";
import userInfo from "../../controllers/Profile/profileController.js";
import userSignup from "../../controllers/authentication/signupController.js";
import authenticateTransaction from "../../controllers/transactions/transactionController.js";
import markNotification from "../../controllers/user_notifications/notificationsController.js";
const router = express.Router();

router.get("/profile/info", userInfo);
router.get("/confirm-account", confirmAccount);
router.get("/get-refresh-token", getRefreshToken);

router.post("/registration", userSignup);
router.post("/login", userLogin);
router.post("/billing", billing);
router.post("/new-verification-link", newVerificationLink);

router.put("/profile/security", configureSecurity);
router.put("/transaction", authenticateTransaction);
router.put("/notifications", markNotification);

export default router;
