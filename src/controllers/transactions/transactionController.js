"use strict";
const { description } = require("../../config/configurations");
const { _verify } = require("../../utils/jwtConfig");
const axios = require("axios").default;

const authenticateTransaction = async (req, res) => {
  const ds = new Date();
  const TOKEN = await req.get("authorization");
  const ORIGIN = await req.get("Origin");
  const USERAGENT = await req.get("User-Agent");
  const IP = req.socket.remoteAddress;
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
  console.log(TRANSACTION);
  try {
    if (!CHECK) {
      res.status(401).json("");
    }
    if (!PC || USERAGENT.match(/Postman/i)) {
      console.log("MADE IT WITH POSTMAN");
      if (TRANSACTION.location.trim().length === 5) {
        console.log("ATM TIME!!!");
        const ATM = await axios.post(
          `http://localhost:${description.dest[0]}/api/${description.version}/secure/transaction/atm-transaction`,
          TRANSACTION
        );
        res.status(200).json(ATM.data);
        return;
      }

      const vendorTransfer = await axios.post(
        `http://localhost:${description.dest[0]}/api/${description.version}/secure/transaction/vendor-transfer`,
        TRANSACTION
      );

      return res.status(200).json(vendorTransfer.data);
    }

    if (PC || ORIGIN === "localhost:3000" || USERAGENT.match(/Postman/i)) {
      console.log("MADE IT!");
      if (typeof TOKEN !== "string" || !TOKEN) {
        res.status(401);
        return;
      }
      if (!CHECK) {
        res.status(401);
        return;
      }
      console.log("MADE IT x2");
      const userTransfer = await axios.post(
        `http://localhost:${description.dest[0]}/api/${description.version}/secure/transaction/account-transfer`,
        TRANSACTION
      );
      console.log(userTransfer.data);

      const setNotification = await axios.post(
        `http://localhost:${description.dest[1]}/user/notifications/set-notifications`,
        userTransfer.data
      );
      res.status(200).json(setNotification.data);
    }
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

module.exports = { authenticateTransaction };
