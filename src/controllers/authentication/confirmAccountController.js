"use strict";
import axios from "axios";
import _config from "../../config/configurations.js";
import { _verify } from "../../utils/jwtConfig.js";
const confirmAccount = async (req, res) => {
  const TOKEN = await req.query.token;
  try {
    const RESULT = await axios.post(
      `${_config.DOMAIN.bank_api_domain}:${_config.PORT.bank_api_port}/${_config.API_VERSION}/${_config.PATH.BANK_PATH.VERIFY_ACCOUNT}`,
      { confirmationToken: TOKEN }
    );
    if (RESULT.status >= 200 || RESULT.status <= 299) {
      res.status(RESULT.status).json(RESULT.data);
    } else {
      res.status(400).json("");
    }
  } catch (error) {
    console.log(error);
  }
};

const newVerificationLink = async (req, res) => {
  const TOKEN = req.body.token;
  if (typeof TOKEN !== "string") {
    res.status(400).json("");
    return;
  }

  const CHECK = await _verify(TOKEN);
  if (!CHECK) {
    res.status(401).json("");
    return;
  }

  try {
    const newToken = await axios.get(
      `${_config.DOMAIN.bank_api_domain}:${_config.PORT.bank_api_port}/${_config.API_VERSION}/${_config.PATH.BANK_PATH.GENERATE_TOKEN}`,
      { params: { email: CHECK.user } }
    );
    console.log(newToken.data);
    await axios.post(
      `${_config.DOMAIN.notifications_api_domain}:${_config.PORT.notifications_api_port}/${_config.API_VERSION}/${_config.PATH.NOTI_PATH.VERIFICATION}`,
      {
        token: newToken.data,
        person: {
          name: "",
          email: CHECK.user,
        },
      }
    );
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(401).json("");
  }
};

export { confirmAccount, newVerificationLink };
