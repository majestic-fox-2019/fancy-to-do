const todoRoute = require('express').Router()
const authorization = require('../middlewares/authorization')
const todoController = require('../controlllers/todoController')

todoRoute.get('/', todoController.showAll)
todoRoute.post('/', todoController.createTodo)
todoRoute.get('/:id', authorization, todoController.findById)
todoRoute.put('/:id', authorization ,todoController.updateTodo)
todoRoute.delete('/:id', authorization , todoController.deleteTodo)


module.exports = todoRoute