"use strict";
const axios = require("axios").default;
const { description } = require("../../config/configurations");
const getBankInfo = async (req, res) => {
  try {
    const fetchInfo = await axios.get(
      `http://localhost:${description.dest[0]}/api/${description.version}/bank/info`
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
