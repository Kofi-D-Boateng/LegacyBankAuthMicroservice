"use strict";
const axios = require("axios").default;
const { _config } = require("../../config/configurations");
const getBankInfo = async (req, res) => {
  try {
    const fetchInfo = await axios.get(
      `${_config.domain.bank_api_domain}:${_config.dest.bank_api_port}/api/${_config.version}/bank/info`
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
