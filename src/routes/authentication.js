"use-strict";
var express = require("express");
const { userLogin } = require("../controllers/authentication/loginController");
var router = express.Router();

router.post("/signup");
router.post("/login", userLogin);

module.exports = router;
