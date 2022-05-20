"use strict";
import _config from "../../config/configurations.js";
import { _getBankInfo } from "../../utils/redisCache.js";

const getBankInfo = async (req, res) => {
  const KEY = "LB";
  const CACHE = await _getBankInfo(KEY);
  const fetchedInfo = await JSON.parse(CACHE);
  const BANK = {
    name: fetchedInfo.name,
    country: fetchedInfo.country,
    state: fetchedInfo.state,
    zipcode: fetchedInfo.zipcode,
    totalHoldings: fetchedInfo.totalHoldings,
    branches: fetchedInfo.branches,
  };
  if (BANK) {
    res.status(200).json(BANK);
    return;
  }
  res.status(404).json("");
};

export default getBankInfo;
