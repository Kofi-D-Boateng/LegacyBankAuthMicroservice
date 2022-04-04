const crypto = require("crypto");

const description = {
  createdBy: "Kofi Boateng",
  date: "3/19/2022",
  version: "v1",
  dest: 8080,
  purpose: ["authentication", "bank"],
};

const _config = {
  algorithm: "HS256",
  secret: "LegacyBank" + crypto.randomBytes(16).toString("base64"),
  iss: "Legacy Bank",
  expiresIn: 5000,
};

module.exports = { description, _config };
