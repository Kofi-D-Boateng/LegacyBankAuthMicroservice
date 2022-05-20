"use strict";
import jwt from "jsonwebtoken";
import _config from "../config/configurations.js";

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
    console.log(TOKENCHECK);
    return TOKENCHECK;
  } catch (e) {
    console.log("ERROR: " + e.message);
    return undefined;
  }
};

export { _sign, _verify };
