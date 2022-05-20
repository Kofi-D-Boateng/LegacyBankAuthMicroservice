"use strict";
import axios from "axios";
import redis from "redis";
import _config from "../config/configurations.js";

const REDIS_URL = `redis://${_config.REDIS_HOST}:${_config.REDIS_PORT}`;
const CLIENT = redis.createClient({ url: REDIS_URL });

CLIENT.connect();

const _flushUser = async (EMAIL, KEY) => {
  try {
    await CLIENT.DEL(KEY);
  } catch (error) {
    console.log(error);
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
    return NOTIS;
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
          params: { username: EMAIL },
        }
      );

      const USERINFO = await axios.get(
        `${_config.DOMAIN.bank_api_domain}:${_config.PORT.bank_api_port}/${_config.API_VERSION}/${_config.PATH.BANK_PATH.FETCH_CUSTOMER}`,
        { params: { username: CHECK.user } }
      );

      const NEWUSER = {
        info: USERINFO.data,
        noti: USERINFO.data,
      };

      console.log(NEWUSER);

      await CLIENT.set(EMAIL, JSON.stringify(NEWUSER));
      return NEWUSER;
    }
    return NOTIS;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { _flushUser, _getUserInfo, _getBankInfo };
