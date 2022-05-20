"use-strict";
import { randomBytes } from "crypto";

// UPDATED URI @ 5/14/2022 by Kofi Boateng
const _config = {
  createdBy: "Kofi Boateng",

  date: "4/21/2022",

  APP_PORT: process.env.AUTH_PORT,

  DOMAIN: {
    bank_api_domain: process.env.LB_BANK_API_DOMAIN || "http://localhost",
    notifications_api_domain:
      process.env.LB_NOTIFICATIONS_API_DOMAIN || "http://localhost",
  },
  PORT: {
    bank_api_port: process.env.LB_BANK_API_PORT || 8080,
    notifications_api_port: process.env.LB_NOTIFICATIONS_API_PORT || 5500,
  },
  API_VERSION: "api/v1",
  PATH: {
    NOTI_PATH: {
      FETCH_NOTIS: "user/notifications",
      MARK_NOTI: "",
      VERIFICATION: "verification/send-email",
    },
    BANK_PATH: {
      FETCH_INFO: "bank/info",
      FETCH_CUSTOMER: "customer/profile",
    },
    USER_PATH: {
      SECURITY: "customer/security",
      ATM_TRANSACTION: "secure/transaction/atm-transaction",
      VENDOR_TRANSACTION: "secure/transaction/vendor-transaction",
      USER_TRASNFER: "secure/transaction/account-transfer",
      CREATE_NOTIFICATION: "user/notifications/set-notifications",
      MARK_NOTIFICATION: "user/notifications/mark-notification",
      LOGIN: "authentication/login",
      SIGNUP: "authentication/registration",
    },
  },
  REDIS_HOST: process.env.REDIS_CACHE_IP,
  REDIS_PORT: process.env.REDIS_CACHE_PORT,
  purpose: ["authentication", "bank"],

  algorithm: process.env.JWT_ALGO,

  secret: "LegacyBank" + randomBytes(16).toString("base64"),

  iss: "Legacy Bank",

  expiresIn: process.env.JWT_EXPIRES_IN,

  cors_allow_origins: process.env.CORS_ALLOW_ORIGINS || "*",
};

export default _config;
