"use strict"

const router = require('express').Router()
const TodoController = require("../controllers/todo")
const authenticate = require("../middleware/authentication")
const authorize = require('../middleware/authorize')

router.use(authenticate)
router.post("/", TodoController.createTodo)
router.get("/", TodoController.findAll)
router.get("/:id", TodoController.findOne)
router.put("/:id", authorize, TodoController.update)
router.delete("/:id", authorize, TodoController.remove)

module.exports = router