"use strict";
import axios from "axios";
import _config from "../../config/configurations.js";
import { _verify } from "../../utils/jwtConfig.js";
import { _flushUser } from "../../utils/redisCache.js";

const authenticateTransaction = async (req, res) => {
  const ds = new Date();
  const TOKEN = await req.get("authorization");
  const ORIGIN = await req.get("Origin");
  const USERAGENT = await req.get("User-Agent");
  const PC = await USERAGENT.match(/Macintosh|Windows|Linux|X11|/i);
  const CHECK = await _verify(TOKEN);
  const TRANSACTION = {
    accountNumber:
      req.body.accountNumber && typeof req.body.accountNumber === "string"
        ? req.body.accountNumber
        : undefined,
    cardNumber:
      req.body.cardNumber && typeof req.body.cardNumber === "number"
        ? req.body.cardNumber
        : undefined,
    cvc:
      req.body.cvc && typeof req.body.cvc === "number"
        ? req.body.cvc
        : undefined,
    emailOfTransferee:
      req.body.email && typeof req.body.email === "string"
        ? req.body.email
        : undefined,
    dateOfTransaction: ds.toISOString(),
    amount: req.body.amount,
    type: req.body.type,
    phoneNumberOfTransferee: req.body.phoneNumber,
  };

  try {
    if (!PC || USERAGENT.match(/Postman/i)) {
      if (!CHECK) {
        res.status(401).json();
      }
      if (TRANSACTION.location.trim().length === 5) {
        const ATM = await axios.post(
          `${_config.DOMAIN.bank_api_domain}:${_config.PORT.bank_api_port}/${_config.API_VERSION}/${_config.PATH.USER_PATH.ATM_TRANSACTION}`,
          TRANSACTION
        );
        res.status(200).json(ATM.data);
        await _flushUser([CHECK.user]);
        return;
      }

      const vendorTransfer = await axios.post(
        `${_config.DOMAIN.bank_api_domain}:${_config.PORT.bank_api_port}/${_config.API_VERSION}/${_config.PATH.USER_PATH.VENDOR_TRANSACTION}`,
        TRANSACTION
      );
      res.status(200).json(vendorTransfer.data);
      await _flushUser([CHECK.user]);
      return;
    }

    if (PC || ORIGIN === "localhost:3000" || USERAGENT.match(/Postman/i)) {
      if (typeof TOKEN !== "string" || !TOKEN) {
        res.status(401).json();
        return;
      }

      const userTransfer = await axios.post(
        `${_config.DOMAIN.bank_api_domain}:${_config.PORT.bank_api_port}/${_config.API_VERSION}/${_config.PATH.USER_PATH.USER_TRASNFER}`,
        TRANSACTION
      );

      const setNotification = await axios.post(
        `${_config.DOMAIN.notifications_api_domain}:${_config.PORT.notifications_api_port}/${_config.API_VERSION}/${_config.PATH.USER_PATH.CREATE_NOTIFICATION}`,
        userTransfer.data
      );
      res.status(200).json(setNotification.data);
      await _flushUser([CHECK.user, TRANSACTION.emailOfTransferee]);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json();
  }
};

export default authenticateTransaction;
