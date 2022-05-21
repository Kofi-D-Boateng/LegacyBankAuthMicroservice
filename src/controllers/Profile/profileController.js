"use strict";
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
    fName: USER.info.firstName,
    lName: USER.info.lastName,
    email: USER.info.email,
    country: USER.info.country,
    state: USER.info.state,
    accountNum: USER.info.accountNumber,
    routingNum: USER.info.routingNumber,
    funds: parseFloat(USER.info.capital.toFixed(2)),
    transactions: USER.info.transactions,
    zipCode: USER.info.zipcode,
    notis: USER.noti ? USER.noti : undefined,
  });
};

export default userInfo;
