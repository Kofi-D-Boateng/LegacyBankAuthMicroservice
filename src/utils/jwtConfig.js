"use strict";
import jwt from "jsonwebtoken";
import _config from "../config/configurations.js";
import { randomBytes } from "crypto";

const _sign = async (email) => {
  const PAYLOAD = {
    user: email,
    key: randomBytes(10).toString(_config.KEY_ENCODE_TYPE),
    iss: _config.ISS,
  };
  return jwt.sign(PAYLOAD, _config.SECRET, {
    algorithm: _config.ALGORITHM,
    expiresIn: _config.EXPIRESIN,
  });
};

const _verify = async (token) => {
  try {
    const TOKENCHECK = jwt.verify(token, _config.SECRET, {
      algorithms: _config.ALGORITHM,
    });
    return TOKENCHECK;
  } catch (e) {
    console.log("ERROR: " + e.message);
    return undefined;
  }
};

export { _sign, _verify };
