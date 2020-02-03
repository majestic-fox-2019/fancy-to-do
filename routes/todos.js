const route = require("express").Router()
const todoController = require("../controllers/todos")

route.post('/',todoController.create)
route.get('/',todoController.findAll)
route.get('/:id',todoController.findById)
route.put('/:id',todoController.update)
route.delete('/:id',todoController.delete)

module.exports = route