"use strict"

const router = require('express').Router()
const todoRouter = require("./todo")

router.use("/todos", todoRouter)


module.exports = router