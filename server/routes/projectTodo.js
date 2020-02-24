"use strict"

const router = require("express").Router()
const ProjectTodoController = require("../controllers/projectTodo")
const authentication = require("../middleware/authentication")
const authorizeProject = require("../middleware/authorizeProject")

router.use(authentication)
router.post("/:projectId", ProjectTodoController.createTodo)
router.get("/:projectId", ProjectTodoController.findAll)
router.get("/:projectId/:id", authorizeProject, ProjectTodoController.findOne)
router.put("/:projectId/:id", authorizeProject, ProjectTodoController.update)
router.delete("/:projectId/:id", authorizeProject, ProjectTodoController.remove)

module.exports = router