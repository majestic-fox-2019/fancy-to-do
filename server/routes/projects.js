const route = require("express").Router()
const projectController = require("../controllers/projects")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const access = require("../middlewares/access")
route.use(authentication)
route.post('/',projectController.create)
route.get('/',projectController.findAll)
route.use('/:id',access.accessProject)
route.get('/:id',projectController.findById)
route.put('/:id',projectController.update)
route.delete('/:id',projectController.delete)

module.exports = route