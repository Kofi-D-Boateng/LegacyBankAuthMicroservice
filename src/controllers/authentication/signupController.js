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

    if (REQUEST.data["message"]) {
      throw new Error(REQUEST.data["message"]);
    }

    const TOKEN = REQUEST.data;
    if (TOKEN && typeof TOKEN === "string") {
      const SENDEMAIL = await axios.post(
        `${_config.DOMAIN.notifications_api_domain}:${_config.PORT.notifications_api_port}/${_config.API_VERSION}/${_config.PATH.NOTI_PATH.VERIFICATION}`,
        {
          token: TOKEN,
          person: {
            name: PARAMS.firstName + " " + PARAMS.lastName,
            email: PARAMS.email,
          },
        }
      );

      if (SENDEMAIL.data["message"]) {
        throw new Error(SENDEMAIL.data["message"]);
      }

      res.status(200).json({ isSaved: true });
    }
  };
  try {
    await fetchRegistration(PARAMS);
  } catch (error) {
    const ERRORMSG = error.message;
    if (ERRORMSG.includes("is taken")) {
      res.status(401).json();
      return;
    }
    res.status(400).json();
  }
};

export default userSignup;
