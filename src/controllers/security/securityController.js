"use strict";
import axios from "axios";
import _config from "../../config/configurations.js";
import { _verify } from "../../utils/jwtConfig.js";
import { _flushUser } from "../../utils/redisCache.js";

const configureSecurity = async (req, res) => {
  const TOKEN = await req.get("authorization");
  const USERAGENT = await req.get("User-Agent");
  const CHECK = await _verify(TOKEN);
  const PC = await USERAGENT.match(/Macintosh|Windows|Linux|X11|/i);

  const SECURITY = {
    accountNumber: req.body.accountNumber ? req.body.accountNumber : undefined,
    lockedCard: req.body.card ? true : false,
    lockedAccount: req.body.account ? true : false,
    email: req.body.email,
  };

  if (!PC || !CHECK) {
    res.status(401).json();
  }

  const fetchSecurity = async (SECURITY) => {
    const fetch = await axios.put(
      `${_config.DOMAIN.bank_api_domain}:${_config.PORT.bank_api_port}/${_config.API_VERSION}/${_config.PATH.USER_PATH.SECURITY}`,
      SECURITY
    );
    await _flushUser([CHECK.user]);
    res.status(fetch.status).json();
  };

  try {
    fetchSecurity(SECURITY);
  } catch (error) {
    console.log(error.message);
    res.status(400).json();
  }
};

export default configureSecurity;
