const route = require("express").Router()
const todoController = require("../controllers/todos")
const authentication = require("../middlewares/authentication")
const userController = require("../controllers/users")
route.use(authentication)
route.post('/',todoController.create)
route.get('/',todoController.findAll)
route.use('/:id',userController.authorization)
route.get('/:id',todoController.findById)
route.put('/:id',todoController.update)
route.delete('/:id',todoController.delete)

module.exports = route