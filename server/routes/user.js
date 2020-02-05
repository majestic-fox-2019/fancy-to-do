const express = require("express");
const router = express.Router();
const Controller = require("../controllers/user");

router.post("/register", Controller.register);
router.post("/signInGoogle", Controller.signInGoogle);
router.post("/login", Controller.login);

module.exports = router;
