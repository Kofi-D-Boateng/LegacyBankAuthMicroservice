"use strict";
import axios from "axios";
import _config from "../config/configurations.js";
import CLIENT from "../config/redis/redis-cache.js";

const _flushUser = async (KEY) => {
  try {
    let i = 0;
    while (i < KEY.length) {
      const USER = await CLIENT.GET(KEY[i]);
      if (USER) {
        await CLIENT.DEL(KEY[i]);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const _getBankInfo = async (KEY) => {
  try {
    const NOTIS = await CLIENT.get(KEY);
    if (!NOTIS) {
      const NOTIS = await axios.get(
        `${_config.DOMAIN.bank_api_domain}:${_config.PORT.bank_api_port}/${_config.API_VERSION}/${_config.PATH.BANK_PATH.FETCH_INFO}`
      );
      await CLIENT.set(KEY, JSON.stringify(NOTIS.data));
      return NOTIS.data;
    }
    return JSON.parse(NOTIS);
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

const _getUserInfo = async (EMAIL) => {
  try {
    const USER = await CLIENT.get(EMAIL);
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
      const NEWUSER = {
        noti: NOTIS.data,
        info: USERINFO.data,
      };

      await CLIENT.set(EMAIL, JSON.stringify(NEWUSER));
      return NEWUSER;
    }
    return JSON.parse(USER);
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export { _flushUser, _getUserInfo, _getBankInfo };
