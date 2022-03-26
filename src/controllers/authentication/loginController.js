"use strict";
const bcrypt = require("bcrypt");
const { _sign, _config } = require("../../utils/jwtConfig");
const { version, dest } = require("../../config/configurations");
const axios = require("axios").default;

const userLogin = async (req, res) => {
  const CREDENTIALS = {
    email: req.body.email,
    password: req.body.password,
  };

  if (
    CREDENTIALS.email.trim().length === 0 ||
    CREDENTIALS.password.trim().length === 0
  ) {
    res.status(401);
    return;
  }

  const fetchData = async (credentials) => {
    const REQUEST = await axios.post(
      `http://localhost:${dest}/api/${version}/authentication/login`,
      credentials
    );
    console.log(REQUEST.data);
    if (REQUEST.status >= 400 && REQUEST.status <= 599) {
      return REQUEST.status;
    }
    const PWCHECK = await bcrypt.compare(
      CREDENTIALS.password,
      REQUEST.data.password
    );
    const TOKEN = await _sign(REQUEST.data.email);
    if (!PWCHECK) {
      res.status(401);
      return;
    }
    res.status(200).json({
      token: TOKEN,
      expiresIn: _config.expiresIn,
      firstName: REQUEST.data.firstName,
      lastName: REQUEST.data.lastName,
      email: REQUEST.data.email,
    });
  };
  try {
    await fetchData(CREDENTIALS);
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};

module.exports = { userLogin };
