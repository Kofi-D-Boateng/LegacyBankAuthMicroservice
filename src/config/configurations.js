"use-strict";
const crypto = require("crypto");

// UPDATE URI @ 4/21/2022 by Kofi Boateng
const description = {
  createdBy: "Kofi Boateng",
  date: "4/21/2022",
  domain: "http://localhost",
  version: "v1",
  dest: 8080,
  purpose: ["authentication", "bank"],
};

const _config = {
  algorithm: "HS256",
  secret: "LegacyBank" + crypto.randomBytes(16).toString("base64"),
  iss: "Legacy Bank",
  expiresIn: "1hr",
};

module.exports = { description, _config };
