"use strict";
const axios = require("axios").default;
const { version, dest } = require("../../config/configurations");
const { _verify } = require("../../utils/jwtConfig");
const getBankInfo = async (req, res) => {
  console.log("INSIDE");
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

    const BANK = {
      name: fetchInfo.data.name,
      country: fetchInfo.data.country,
      state: fetchInfo.data.state,
      zipcode: fetchInfo.data.zipcode,
      totalHoldings: fetchInfo.data.totalHoldings,
      branches: fetchInfo.data.branches,
    };
    console.log(fetchInfo.data);
    res.status(200).json(BANK);
  } catch (error) {
    res.status(404);
    console.log(error);
  }
};

module.exports = { getBankInfo };
