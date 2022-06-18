"use strict";
import axios from "axios";
import _config from "../config/configurations.js";
import CLIENT from "../config/redis/redis-cache.js";

const _flushUser = async (KEY) => {
  console.log("Flushing user with key: " + KEY);
  try {
    const USER = await CLIENT.GET(KEY);
    if (USER) {
      await CLIENT.DEL(KEY);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const _getBankInfo = async (KEY) => {
  try {
    const BANK = await CLIENT.get(KEY);
    if (!BANK) {
      const BANKINFO = await axios.get(
        `${_config.DOMAIN.bank_api_domain}:${_config.PORT.bank_api_port}/${_config.API_VERSION}/${_config.PATH.BANK_PATH.FETCH_INFO}`
      );
      await CLIENT.set(KEY, JSON.stringify(BANKINFO.data));
      return BANKINFO.data;
    }
    console.log("Grabbing bank info from cache...");
    return JSON.parse(BANK);
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
const _getUserInfo = async (KEY, EMAIL) => {
  console.log("SEARCHING FOR USER WITH KEY: " + KEY);
  try {
    const USER = await CLIENT.get(KEY);
    if (!USER) {
      const NOTIS = await axios.get(
        `${_config.DOMAIN.notifications_api_domain}:${_config.PORT.notifications_api_port}/${_config.API_VERSION}/${_config.PATH.NOTI_PATH.FETCH_NOTIS}`,
        {
          params: { email: EMAIL },
        }
      );

      const USERINFO = await axios.get(
        `${_config.DOMAIN.bank_api_domain}:${_config.PORT.bank_api_port}/${_config.API_VERSION}/${_config.PATH.BANK_PATH.FETCH_CUSTOMER}`,
        { params: { username: EMAIL } }
      );

      const USER = {
        noti: NOTIS.data.notifications,
        info: USERINFO.data,
      };
      await CLIENT.set(KEY, JSON.stringify(USER));
      return USER;
    }
    return JSON.parse(USER);
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export { _flushUser, _getUserInfo, _getBankInfo };
