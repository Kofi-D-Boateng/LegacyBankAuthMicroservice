"use-strict";
const router = require("express").Router();
const { userLogin } = require("../controllers/authentication/loginController");
const {
  userSignup,
} = require("../controllers/authentication/signupController");

router.post("/registration", userSignup);
router.post("/login", userLogin);

module.exports = router;
