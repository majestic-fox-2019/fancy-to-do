"use strict"

const router = require("express").Router()
const todoRouter = require("./todo")
const userRouter = require("./user")
const ProjectRouter = require("./project")
const ProjectTodoRouter = require("./projectTodo")
const purgomalumRouter = require("./purgomalum")

router.use("/purgomalum", purgomalumRouter)
router.use("/todos", todoRouter)
router.use("/users", userRouter)
router.use("/projects", ProjectRouter)
router.use("/projectTodos", ProjectTodoRouter)

module.exports = router