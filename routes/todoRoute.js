const todoRoute = require('express').Router()

const todoController = require('../controlllers/TodoController')

todoRoute.get('/', todoController.showAll)
todoRoute.get('/:id', todoController.findById)
todoRoute.post('/', todoController.createTodo)
todoRoute.put('/:id', todoController.updateTodo)
todoRoute.delete('/:id', todoController.deleteTodo)


module.exports = todoRoute