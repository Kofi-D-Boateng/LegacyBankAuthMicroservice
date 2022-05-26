"use strict";
import { compare } from "bcrypt";
import { _sign } from "../../utils/jwtConfig.js";
import _config from "../../config/configurations.js";
import axios from "axios";

const userLogin = async (req, res) => {
  const CREDENTIALS = {
    email: req.body.email ? req.body.email : undefined,
    password: req.body.password ? req.body.password : undefined,
  };
  console.log(CREDENTIALS.email);
  if (
    CREDENTIALS.email === undefined ||
    CREDENTIALS.password === undefined ||
    CREDENTIALS.email.trim().length === 0 ||
    CREDENTIALS.password.trim().length === 0
  ) {
    res.status(401).json();
    return;
  }

  const fetchData = async (credentials) => {
    const REQUEST = await axios.post(
      `${_config.DOMAIN.bank_api_domain}:${_config.PORT.bank_api_port}/${_config.API_VERSION}/${_config.PATH.USER_PATH.LOGIN}`,
      credentials
    );
    const PWCHECK = await compare(CREDENTIALS.password, REQUEST.data.password);
    if (!PWCHECK) {
      res.status(401).json();
      return;
    }
    const TOKEN = await _sign(REQUEST.data.email);
    res.status(200).json({
      token: TOKEN,
      expiresIn: +_config.EXPIRESIN,
      isLocked: REQUEST.data.locked,
      isEnabled: REQUEST.data.enabled,
    });
  };
  try {
    await fetchData(CREDENTIALS);
  } catch (error) {
    const err = error.response.data["message"];
    console.log(err + " for " + CREDENTIALS.email);
    if (err.includes("Could not open JPA EntityManager for transaction;")) {
      res.status(404).json();
    } else {
      res.status(401).json();
    }
  }
};

export default userLogin;
