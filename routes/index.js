const express = require("express");
const router = express.Router();
const Todo = require("./todo");

router.use("/todos", Todo);

module.exports = router;
