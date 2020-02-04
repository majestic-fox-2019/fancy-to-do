"use strict"

const router = require("express").Router()
const todoRouter = require("./todo")
const userRouter = require("./user")
// const calendarRouter = require("./ calendar")

router.use("/todos", todoRouter)
router.use("/users", userRouter)
// router.use("/calendar", calendarRouter)

module.exports = router