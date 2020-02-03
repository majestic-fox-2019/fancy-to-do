var express = require('express');
var router = express.Router();
var todoRoute = require("./todoRoutes");

router.use("/todo",todoRoute);
module.exports = router