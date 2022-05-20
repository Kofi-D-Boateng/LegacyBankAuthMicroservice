"use strict";
import axios from "axios";
import _config from "../../config/configurations.js";
import { _verify } from "../../utils/jwtConfig.js";

const configureSecurity = async (req, res) => {
  const TOKEN = await req.get("authorization");
  const ORIGIN = await req.get("Origin");
  const USERAGENT = await req.get("User-Agent");
  const IP = req.socket.remoteAddress;
  const CHECK = await _verify(TOKEN);

  const SECURITY = {
    accountNumber: req.body.accountNumber ? req.body.accountNumber : undefined,
    lockedCard: req.body.card ? true : false,
    lockedAccount: req.body.account ? true : false,
  };

  const PC = await USERAGENT.match(/Macintosh|Windows|Linux|X11|/i);
  if (!PC || !CHECK) {
    res.status(401);
  }

  const fetchSecurity = async (SECURITY) => {
    const fetch = await axios.post(
      `${_config.DOMAIN.bank_api_domain}:${_config.PORT.bank_api_port}/${_config.API_VERSION}/${_config.PATH.USER_PATH.SECURITY}`,
      SECURITY
    );
    res.status(fetch.status).json("");
  };

  try {
    fetchSecurity(SECURITY);
  } catch (error) {
    res.status(404).json("");
  }
};

export default configureSecurity;
