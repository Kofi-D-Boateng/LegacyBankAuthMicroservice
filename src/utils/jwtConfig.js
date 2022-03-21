"use strict";
const jwt = require("jsonwebtoken");
require("dotenv").config;
const crypto = require("crypto");

const _config = {
  algorithm: "HS256",
  secret: "LegacyBank" + crypto.randomBytes(16).toString("base64"),
  iss: "Legacy Bank",
  expiresIn: "600000",
};

const _sign = async (email) => {
  const PAYLOAD = {
    user: email,
    expiresIn: _config.expiresIn,
    iss: _config.iss,
  };
  return jwt.sign(PAYLOAD, _config.secret, { algorithm: _config.algorithm });
};

const _verify = async (token) => {
  try {
    const TOKENCHECK = jwt.verify(token, _config.secret, {
      algorithms: _config.algorithm,
    });
    if (TOKENCHECK) return TOKENCHECK;
  } catch (e) {
    console.log(e.message);
    return "";
  }
};

module.exports = { _sign, _verify, _config };
