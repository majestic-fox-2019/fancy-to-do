const todo = require('express').Router()
const controller = require('../controllers/todo')
const authToken = require('../middleware/authToken')

todo.use(authToken)
todo.get('/', controller.getTodos)
todo.post('/', controller.addTodo)
todo.get('/:id', controller.getTodoItem)
todo.put('/:id', controller.editTodo)
todo.delete('/:id', controller.deleteTodo)

module.exports = todo