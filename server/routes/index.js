const express = require("express");
const router = express.Router();
const User = require("./user");
const authentication = require("../middlewares/authentication");
const Todo = require("./todo");
const error = require("../middlewares/error");

router.use("/", User);
router.use(authentication);
router.use("/todos", Todo);

router.use(error);

module.exports = router;
