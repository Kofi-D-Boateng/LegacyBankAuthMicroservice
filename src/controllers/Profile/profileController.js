"use strict";
import _config from "../../config/configurations.js";
import { _verify } from "../../utils/jwtConfig.js";
import { _getUserInfo } from "../../utils/redisCache.js";

const userInfo = async (req, res) => {
  const TOKEN = await req.get("authorization");
  const ORIGIN = await req.get("Origin");
  const IP = (await req.get("x-forwarded-for")) || req.socket.remoteAddress;
  try {
    const CHECK = await _verify(TOKEN);
    const USER = await _getUserInfo(CHECK.user);
    res.status(200).json({
      fName: USER.info.firstName,
      lName: USER.info.lastName,
      email: USER.info.email,
      country: USER.info.country,
      state: USER.info.state,
      accountNum: USER.info.accountNumber,
      routingNum: USER.info.routingNumber,
      isEnabled: USER.info.enabled,
      isLocked: USER.info.locked,
      funds: parseFloat(USER.info.capital.toFixed(2)),
      transactions: USER.info.transactions,
      zipCode: USER.info.zipcode,
      notis: USER.noti ? USER.noti : undefined,
    });
  } catch (error) {
    console.log(error.message);
    res.status(401).json();
  }
};

export default userInfo;
