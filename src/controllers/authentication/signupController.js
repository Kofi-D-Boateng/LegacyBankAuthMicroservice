"use strict";
const axios = require("axios").default;
const { version, dest } = require("../../config/configurations");

const userSignup = async (req, res) => {
  const PARAMS = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    dob: req.body.dob,
    email: req.body.email,
    country: req.body.country,
    state: req.body.state,
    zipcode: req.body.zipcode,
    socialSecurity: req.body.socialSecurity,
    capital: 0,
  };
  console.log(PARAMS);

  const fetchRegistration = async (params) => {
    const REQUEST = await axios.post(
      `http://localhost:${dest}/api/${version}/authentication/registration`,
      params
    );
    res.status(200).json({ isSaved: REQUEST.data ? true : false });
  };
  try {
    await fetchRegistration(PARAMS);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userSignup };
