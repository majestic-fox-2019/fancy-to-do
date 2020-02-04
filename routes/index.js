var express = require('express');
var router = express.Router();
var todoRoute = require("./todoRoutes");
var userRoute = require("./userRoute")
var authentication = require("../middlewares/authentication")
router.use("/user",userRoute);

router.use(authentication)

router.use("/todo",todoRoute);
module.exports = router