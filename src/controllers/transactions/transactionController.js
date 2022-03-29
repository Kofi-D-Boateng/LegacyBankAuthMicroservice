"use strict";
const { version, dest } = require("../../config/configurations");
const { _verify } = require("../../utils/jwtConfig");
const axios = require("axios").default;

const authenticateTransaction = async (req, res) => {
  const ds = new Date();
  const TOKEN = await req.get("authorization");
  const ORIGIN = await req.get("Origin");
  const USERAGENT = await req.get("User-Agent");
  const IP = req.socket.remoteAddress;
  const PC = USERAGENT.match(/Macintosh|Windows|Linux|X11|/i);
  const ACCEPTED = "Transaction was approved.";
  const DECLINED = "Transaction was declined.";
  const CHECK = await _verify(TOKEN);

  const TRANSACTION = {
    cardNumber:
      req.body.cardNumber && typeof req.body.cardNumber === "number"
        ? req.body.cardNumber
        : undefined,
    cvc:
      req.body.cvc && typeof req.body.cvc === "number"
        ? req.body.cvc
        : undefined,
    location:
      typeof req.body.location === "string"
        ? req.body.location
        : req.body.location.toString(),
    dateOfTransaction:
      typeof req.body.dateOfTransaction === "string" &&
      ds.toISOString(req.body.dateOfTransaction),
    amount:
      typeof req.body.amount === "string"
        ? parseFloat(req.body.amount)
        : req.body.amount,
    type: req.body.type,
  };

  if (!PC || USERAGENT.match(/Postman/i)) {
    console.log("MADE IT WITH POSTMAN");
    if (TRANSACTION.location.trim().length === 5) {
      console.log("ATM TIME!!!");
      const ATM = await axios.post(
        `http://localhost:${dest}/api/${version}/secure/transaction/atm-transaction`,
        TRANSACTION
      );
      if (ATM.data == ACCEPTED || ATM.data == DECLINED) {
        res.json(ATM.data);
        return;
      } else {
        console.log(ATM.data["message"]);
        return;
      }
    }

    const accountTransfer = await axios.post(
      `http://localhost:${dest}/api/${version}/secure/transaction/vendor-transfer`,
      TRANSACTION
    );
    if (
      accountTransfer.data === DECLINED ||
      accountTransfer.data === ACCEPTED
    ) {
      return userTransfer;
    } else {
      console.log(accountTransfer.data);
      return;
    }
  }

  if (PC || ORIGIN === "localhost:3000" || USERAGENT.match(/Postman/i)) {
    if (typeof TOKEN !== "string" || !TOKEN) {
      res.status(401);
      return;
    }
    if (!CHECK) {
      res.status(401);
      return;
    }
    const userTransfer = await axios.post(
      `http://localhost:${dest}/api/${version}/secure/transaction/account-transfer`,
      TRANSACTION
    );
    if (userTransfer.data === DECLINED || userTransfer.data === ACCEPTED) {
      return userTransfer;
    } else {
      console.log(userTransfer.data);
      return;
    }
  }
};

module.exports = { authenticateTransaction };
