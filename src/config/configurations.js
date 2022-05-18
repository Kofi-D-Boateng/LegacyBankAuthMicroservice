"use-strict";
const crypto = require("crypto");

// UPDATED URI @ 5/14/2022 by Kofi Boateng
const _config = {
  createdBy: "Kofi Boateng",

  date: "4/21/2022",

  app_port: process.env.AUTH_PORT,

  domain: {
    bank_api_domain: process.env.LB_BANK_API_DOMAIN || "http://localhost",
    messenger_api_domain:
      process.env.LB_MESSENGER_API_DOMAIN || "http://localhost",
  },

  version: "v1",

  dest: {
    bank_api_port: process.env.LB_BANK_API_PORT || 8080,
    messenger_api_port: process.env.LB_MESSENGER_API_PORT || 5500,
  },

  purpose: ["authentication", "bank"],

  algorithm: process.env.JWT_ALGO,

  secret: "LegacyBank" + crypto.randomBytes(16).toString("base64"),

  iss: "Legacy Bank",

  expiresIn: process.env.JWT_EXPIRES_IN,

  cors_allow_origins: process.env.CORS_ALLOW_ORIGINS || "*",
};

module.exports = { _config };
