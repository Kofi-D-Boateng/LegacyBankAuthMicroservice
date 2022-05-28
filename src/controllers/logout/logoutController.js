import { _verify } from "../../utils/jwtConfig.js";
import { _flushUser } from "../../utils/redisCache.js";

const logoutUser = async (req, res) => {
  const TOKEN = await req.get("authorization");
  const CHECK = await _verify(TOKEN);
  if (!CHECK) {
    res.status(401).json();
    return;
  }
  await _flushUser([CHECK.user]);
  res.status(200).json();
};

export default logoutUser;
