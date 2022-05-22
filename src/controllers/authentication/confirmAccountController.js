"use strict";
import axios from "axios";
import _config from "../../config/configurations.js";
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

export default confirmAccount;
