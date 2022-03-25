"use strict";
const axios = require("axios").default;
const { version, dest } = require("../../config/configurations");
const { _verify } = require("../../utils/jwtConfig");
const getBankInfo = async (req, res) => {
  const TOKEN = req.header("authorization");
  if (!TOKEN) {
    res.status(401);
    return;
  }
  const CHECK = await _verify(TOKEN);
  if (!CHECK) {
    res.status(401);
    return;
  }
  try {
    const fetchInfo = await axios.get(
      `http://localhost:${dest}/api/${version}/bank/info`
    );

    console.log(fetchInfo.data);
    res.json(fetchInfo.data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getBankInfo };
