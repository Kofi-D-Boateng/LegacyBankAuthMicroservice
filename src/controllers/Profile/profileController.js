"use strict";
const { version, dest } = require("../../config/configurations");
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
    res.status(401);
    return;
  }
  if (!CHECK) {
    res.status(401);
    return;
  }
  try {
    console.log(CHECK.user);
    const fetchInfo = await axios.get(
      `http://localhost:${dest}/api/${version}/customer/profile`,
      { params: { username: CHECK.user } }
    );
    const USER = fetchInfo.data;
    if (USER.customerRole !== "USER" || !USER.enabled || USER.locked) {
      console.log("CHECK CONDITIONING");
      res.status(401);
    }
    res.status(200).json({
      fName: USER.firstName,
      lName: USER.lastName,
      email: USER.email,
      country: USER.country,
      state: USER.state,
      accountNum: USER.accountNumber,
      routingNum: USER.routingNumber,
      funds: USER.capital,
      transactions: USER.transactions,
      zipCode: USER.zipcode,
    });
  } catch (error) {
    res.status(404);
    console.log(error);
  }
};

module.exports = { userInfo };
