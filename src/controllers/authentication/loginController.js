"use strict";
const bcrypt = require("bcrypt");
const { _sign, _config } = require("../../utils/jwtConfig");
const axios = require("axios").default;

const description = {
  createdBy: "Kofi Boateng",
  date: "3/19/2022",
  version: "v1",
  dest: 8080,
};

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
      `http://localhost:${description.dest}/api/${description.version}/authentication/login`,
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
  fetchData(CREDENTIALS);
};

module.exports = { userLogin };
