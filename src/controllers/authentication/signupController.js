"use strict";
const axios = require("axios").default;
const { _config } = require("../../config/configurations");

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
    phoneNumber: parseInt(req.body.phoneNumber),
  };

  const fetchRegistration = async (params) => {
    const REQUEST = await axios.post(
      `${_config.domain.bank_api_domain}:${_config.dest.bank_api_port}/api/${_config.version}/authentication/registration`,
      params
    );
    const TOKEN = REQUEST.data;
    if (TOKEN && typeof TOKEN === "string") {
      await axios.post(
        `${_config.domain.messenger_api_domain}:${_config.dest.messenger_api_port}/verification/send-email`,
        {
          token: TOKEN,
          person: {
            name: PARAMS.firstName + " " + PARAMS.lastName,
            email: PARAMS.email,
          },
        }
      );
      res.status(200).json({ isSaved: true });
    }
  };
  try {
    await fetchRegistration(PARAMS);
  } catch (error) {
    const ERRORMSG = error.response.data["message"];
    if (ERRORMSG.includes("is taken")) {
      res.status(401).json(ERRORMSG);
      return;
    }
    res.status(400);
  }
};

const getConfirmationToken = async (req, res) => {
  const TOKEN = req.params["token"];
  console.log(TOKEN);
};

module.exports = { userSignup, getConfirmationToken };
