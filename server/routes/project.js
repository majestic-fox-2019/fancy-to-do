"use strict"

const router = require("express").Router()
const ProjectController = require("../controllers/project")
const authentication = require("../middleware/authentication")
const authorizeAdmin = require("../middleware/authorizeAdmin")

router.use(authentication)
router.post("/", ProjectController.createProject)
router.get("/", ProjectController.findAll)
router.get("/:projectId", ProjectController.findOne)
router.put("/:projectId", authorizeAdmin, ProjectController.update)
router.delete("/:projectId", authorizeAdmin, ProjectController.remove)
router.post("/member/:projectId", authorizeAdmin, ProjectController.addMember)
router.delete("/member/:projectId", authorizeAdmin, ProjectController.deleteMember)

module.exports = router