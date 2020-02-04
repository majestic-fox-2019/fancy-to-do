const todoRoute = require('express').Router()

const todoController = require('../controlllers/todoController')

todoRoute.get('/', todoController.showAll)
todoRoute.post('/', todoController.createTodo)
todoRoute.get('/:id', todoController.authorization, todoController.findById)
todoRoute.put('/:id', todoController.authorization ,todoController.updateTodo)
todoRoute.delete('/:id', todoController.authorization , todoController.deleteTodo)


module.exports = todoRoute