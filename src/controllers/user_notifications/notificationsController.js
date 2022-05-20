"use strict";
import axios from "axios";
import _config from "../../config/configurations.js";
import { _verify } from "../../utils/jwtConfig.js";

const markNotification = async (req, res) => {
  const TOKEN = await req.get("authorization");
  const { msgID } = req.body;
  const CHECK = await _verify(TOKEN);

  if (!CHECK) {
    res.status(401).json("");
  }

  const fetchMarkMessage = async (email, msg_id) => {
    const fetch = await axios.post(
      `${_config.DOMAIN.notifications_api_domain}:${_config.PORT.notifications_api_port}/${_config.API_VERSION}/${_config.PATH.USER_PATH.MARK_NOTIFICATION}`,
      { email: email, msg_id: msg_id }
    );
    console.log(fetch.data);
    if (!fetch.data) {
      res.status(401).json(undefined);
      return;
    }
    res.status(200).json({ notis: fetch.data });
  };

  try {
    await fetchMarkMessage(CHECK.user, msgID);
  } catch (error) {
    console.log(error);
  }
};

export default markNotification;
