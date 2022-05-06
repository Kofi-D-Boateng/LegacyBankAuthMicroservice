"use strict";
const { description } = require("../../config/configurations");
const { _verify } = require("../../utils/jwtConfig");
const axios = require("axios").default;

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
  try {
    console.log(CHECK.user);
    const fetchInfo = await axios.get(
      `http://localhost:${description.dest[0]}/api/${description.version}/customer/profile`,
      { params: { username: CHECK.user } }
    );
    const fetchNotifications = await axios.get(
      `http://localhost:${description.dest[1]}/user/notifications/`,
      { params: { email: CHECK.user } }
    );
    console.log(fetchNotifications.data);
    const USER = await fetchInfo.data;
    const notifications = await fetchNotifications.data;
    if (USER.customerRole !== "USER") {
      res.status(401);
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
  } catch (error) {
    res.status(401).json({
      isAuthorized: false,
    });
    console.log(error);
  }
};

module.exports = { userInfo };
