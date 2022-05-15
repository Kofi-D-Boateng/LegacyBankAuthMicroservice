"use strict";
const { _config } = require("../../config/configurations");
const { _verify } = require("../../utils/jwtConfig");
const axios = require("axios").default;

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
      `${_config.domain.bank_api_domain}:${_config.dest.bank_api_port}/api/${_config.version}/customer/security`,
      SECURITY
    );
    console.log(fetch.status);
    console.log(fetch.data);
    res.status(fetch.status).json("");
  };

  try {
    fetchSecurity(SECURITY);
  } catch (error) {
    res.status(404);
  }
};

module.exports = { configureSecurity };
