"use strict";
const jwt = require("jsonwebtoken");
require("dotenv").config;
const { _config } = require("../config/configurations");

const _sign = async (email) => {
  const PAYLOAD = {
    user: email,
    iss: _config.iss,
  };
  return jwt.sign(PAYLOAD, _config.secret, {
    algorithm: _config.algorithm,
    expiresIn: _config.expiresIn,
  });
};

const _verify = async (token) => {
  try {
    const TOKENCHECK = jwt.verify(token, _config.secret, {
      algorithms: _config.algorithm,
    });
    return TOKENCHECK;
  } catch (e) {
    console.log("ERROR: " + e.message);
    return undefined;
  }
};

module.exports = { _sign, _verify };
