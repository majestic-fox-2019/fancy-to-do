"use strict"

const router = require("express").Router()
const ProjectTodoController = require("../controllers/projectTodo")
const authentication = require("../middleware/authentication")

router.use(authentication)
router.post("/:projectId", ProjectTodoController.createTodo)
router.get("/:projectId", ProjectTodoController.findAll)
router.get("/:projectId/:id", ProjectTodoController.findOne)
router.put("/:projectId/:id", ProjectTodoController.update)
router.delete("/:projectId/:id", ProjectTodoController.remove)

module.exports = router