"use strict";
const bcrypt = require("bcrypt");
const { _sign } = require("../../utils/jwtConfig");
const { _config, description } = require("../../config/configurations");
const axios = require("axios").default;

const userLogin = async (req, res) => {
  const USERAGENT = await req.get("User-Agent");

  const CREDENTIALS = {
    email: req.body.email ? req.body.email : undefined,
    password: req.body.password ? req.body.password : undefined,
  };

  if (
    CREDENTIALS.email === undefined ||
    CREDENTIALS.password === undefined ||
    CREDENTIALS.email.trim().length === 0 ||
    CREDENTIALS.password.trim().length === 0
  ) {
    res.status(401);
    return;
  }

  const fetchData = async (credentials) => {
    const REQUEST = await axios.post(
      `http://localhost:${description.dest[0]}/api/${description.version}/authentication/login`,
      credentials
    );

    const PWCHECK = await bcrypt.compare(
      CREDENTIALS.password,
      REQUEST.data.password
    );
    if (!PWCHECK) {
      res.status(401);
      return;
    }
    const TOKEN = await _sign(REQUEST.data.email);
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
    res.status(401);
  }
};

module.exports = { userLogin };
