const axios = require("axios").default;
const { description } = require("../../config/configurations");
const { _verify } = require("../../utils/jwtConfig");

const markNotification = async (req, res) => {
  const TOKEN = await req.get("authorization");
  const { msgID } = req.body;
  const CHECK = await _verify(TOKEN);

  if (!CHECK) {
    res.status(401).json("");
  }

  const fetchMarkMessage = async (email, msg_id) => {
    const fetch = await axios.post(
      `http://localhost:${description.dest[1]}/user/notifications/mark-notification`,
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
    fetchMarkMessage(CHECK.user, msgID);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { markNotification };
