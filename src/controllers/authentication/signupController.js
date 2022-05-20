"use strict";
import axios from "axios";
import _config from "../../config/configurations.js";

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
      `${_config.DOMAIN.bank_api_domain}:${_config.PORT.bank_api_port}/${_config.API_VERSION}/${_config.PATH.USER_PATH.SIGNUP}`,
      params
    );
    const TOKEN = REQUEST.data;
    if (TOKEN && typeof TOKEN === "string") {
      await axios.post(
        `${_config.DOMAIN.notifications_api_domain}:${_config.PORT.notifications_api_port}/${_config.API_VERSION}/${_config.PATH.NOTI_PATH.VERIFICATION}`,
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

export { userSignup, getConfirmationToken };
