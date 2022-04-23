"use strict";
const { _verify } = require("../../utils/jwtConfig");

const billing = async (req, res) => {
  const { choice } = req.body;
  const TOKEN = await req.get("authorization");

  if (!TOKEN) {
    res.status(401).json();
    return;
  }
  const CHECK = await _verify(TOKEN);
  if (!CHECK) {
    res.status(401).json();
    return;
  }

  if (typeof choice === "string") {
    res.status(200).json("done");
  }
};

module.exports = { billing };
