"use-strict";

import _config from "../../config/configurations.js";
import { _sign, _verify } from "../../utils/jwtConfig.js";

const getRefreshToken = async (req, res) => {
  const TOKEN = await req.query.token;
  try {
    const CHECK = await _verify(TOKEN);
    const expiresIn = +_config.EXPIRESIN;
    const NEWTOKEN = await _sign(CHECK.user);
    res.status(200).json({ token: NEWTOKEN, expiresIn: expiresIn });
  } catch (error) {
    console.log(error.message);
    res.status(401).json();
  }
};

export default getRefreshToken;
