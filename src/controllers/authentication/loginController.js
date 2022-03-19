"use strict";
const bcrypt = require("bcrypt");
const { _sign, _config } = require("../../utils/jwtConfig");
const { _login } = require("../../utils/dbQuery");

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
  const DBROW = await _login(CREDENTIALS.email);
  if (DBROW.rowCount === 0) {
    res.status(401);
    return;
  }
  const USERPW = DBROW.rows[0]["password"];
  const EMAIL = DBROW.rows[0]["email"];
  const FNAME = DBROW.rows[0]["first_name"];
  const LNAME = DBROW.rows[0]["last_name"];
  const PWCHECK = await bcrypt.compare(CREDENTIALS.password, USERPW);
  const TOKEN = await _sign(EMAIL);
  if (!PWCHECK) {
    res.status(401);
    return;
  }
  res.status(200).json({
    token: TOKEN,
    expiresIn: _config.expiresIn,
    firstName: FNAME,
    lastName: LNAME,
  });
};

module.exports = { userLogin };
