const { userInfo } = require("../controllers/Profile/profileController");
const router = require("express").Router();

router.get("/info", userInfo);

module.exports = router;
