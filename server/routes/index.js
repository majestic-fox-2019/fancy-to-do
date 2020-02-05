"use strict"

const router = require("express").Router()
const todoRouter = require("./todo")
const userRouter = require("./user")
const ProjectRouter = require("./project")
const ProjectTodoRouter = require("./projectTodo")
// const calendarRouter = require("./ calendar")

router.use("/todos", todoRouter)
router.use("/users", userRouter)
router.use("/projects", ProjectRouter)
router.use("/projectTodos", ProjectTodoRouter)
// router.use("/calendar", calendarRouter)

module.exports = router