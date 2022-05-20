"use strict";
import _config from "../../config/configurations.js";
import { _verify } from "../../utils/jwtConfig.js";

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

export default billing;
