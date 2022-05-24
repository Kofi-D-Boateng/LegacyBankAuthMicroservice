"use-strict";

import _config from "../../config/configurations.js";
import { _sign, _verify } from "../../utils/jwtConfig.js";

const getRefreshToken = async (req, res) => {
  const TOKEN = await req.query.token;
  const EMAIL = await _verify(TOKEN);
  const expiresIn = _config.EXPIRESIN;
  if (!EMAIL) {
    res.status(401).json();
    return;
  }
  const NEWTOKEN = await _sign(EMAIL);
  res.status(200).json({ token: NEWTOKEN, expiresIn: expiresIn });
};

export default getRefreshToken;
