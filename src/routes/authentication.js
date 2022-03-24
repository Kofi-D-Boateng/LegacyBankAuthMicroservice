"use-strict";
var express = require("express");
const { userLogin } = require("../controllers/authentication/loginController");
const {
  userSignup,
} = require("../controllers/authentication/signupController");
var router = express.Router();

router.post("/registration", userSignup);
router.post("/login", userLogin);

module.exports = router;
