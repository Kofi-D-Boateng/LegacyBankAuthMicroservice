"use-strict";
import { randomBytes } from "crypto";

// UPDATED URI @ 6/25/2022 by Kofi Boateng
const _config = {
  createdBy: "Kofi Boateng",

  date: "4/21/2022",

  APP_PORT: process.env.AUTH_PORT,

  DOMAIN: {
    bank_api_domain: process.env.LB_BANK_API_DOMAIN,
    notifications_api_domain: process.env.LB_NOTI_API_DOMAIN,
  },
  PORT: {
    bank_api_port: process.env.LB_BANK_API_PORT,
    notifications_api_port: process.env.LB_NOTI_API_PORT,
  },
  API_VERSION: "api/v1",
  PATH: {
    NOTI_PATH: {
      FETCH_NOTIS: "user/",
      VERIFICATION: "verification/send-email",
    },
    BANK_PATH: {
      FETCH_INFO: "bank/info",
      FETCH_CUSTOMER: "customer/profile",
      VERIFY_ACCOUNT: "authentication/token-confirmation",
      GENERATE_TOKEN: "authentication/get-new-token",
    },
    USER_PATH: {
      SECURITY: "customer/security",
      ATM_TRANSACTION: "secure/transaction/atm-transaction",
      VENDOR_TRANSACTION: "secure/transaction/vendor-transaction",
      USER_TRASNFER: "secure/transaction/account-transfer",
      CREATE_NOTIFICATION: "user/set-notifications",
      MARK_NOTIFICATION: "user/mark-notification",
      LOGIN: "authentication/login",
      SIGNUP: "authentication/registration",
    },
  },
  REDIS_HOST: process.env.REDIS_CACHE_DOMAIN,
  REDIS_PORT: process.env.REDIS_CACHE_PORT,
  PURPOSE: ["authentication", "bank", "logout"],

  ALGORITHM: process.env.JWT_ALGO,

  SECRET: "LegacyBank" + randomBytes(16).toString("base64"),

  KEY_ENCODE_TYPE: process.env.ENCODE_TYPE || "hex",

  ISS: "Legacy Bank",

  EXPIRESIN: process.env.JWT_EXPIRES_IN,

  CORS_ALLOW_ORIGINS: process.env.CORS_ALLOW_ORIGINS,
};

export default _config;
