var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const authenticationGoogle = require("../middlewares/authenticationGoogle");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/googleLogin", authenticationGoogle, userController.googleLogin);
module.exports = router;
