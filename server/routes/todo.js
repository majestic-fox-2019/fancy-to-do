"use strict"

const router = require('express').Router()
const TodoController = require("../controllers/todo")

router.post("/", TodoController.createTodo)
router.get("/", TodoController.findAll)
router.get("/:id", TodoController.findOne)
router.put("/:id", TodoController.update)
router.delete("/:id", TodoController.remove)

module.exports = router