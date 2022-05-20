"use strict";
import axios from "axios";
import _config from "../../config/configurations.js";
import { _verify } from "../../utils/jwtConfig.js";
import { _getUserInfo } from "../../utils/redisCache.js";

const userInfo = async (req, res) => {
  const TOKEN = await req.get("authorization");
  const ORIGIN = await req.get("Origin");
  const IP = req.socket.remoteAddress;

  if (typeof TOKEN !== "string" || !TOKEN) {
    res.status(401);
    return;
  }

  const CHECK = await _verify(TOKEN);
  if (!CHECK) {
    console.log(CHECK);
    res.status(401).json("invalid");
    return;
  }

  const USER = await _getUserInfo(CHECK.user);
  if (!USER) {
    res.status(401).json("");
    return;
  }

  res.status(200).json({
    fName: USER.firstName,
    lName: USER.lastName,
    email: USER.email,
    country: USER.country,
    state: USER.state,
    accountNum: USER.accountNumber,
    routingNum: USER.routingNumber,
    funds: parseFloat(USER.capital.toFixed(2)),
    transactions: USER.transactions,
    zipCode: USER.zipcode,
    isLocked: USER.locked,
    isEnabled: USER.enabled,
    notis: notifications ? notifications : undefined,
  });
};

export default userInfo;
