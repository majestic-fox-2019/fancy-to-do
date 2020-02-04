const todo = require('express').Router()
const controller = require('../controllers/todo')
const authToken = require('../middleware/authToken')
const authorization = require('../middleware/authorization')

todo.use(authToken)
todo.get('/', controller.getTodos)
todo.post('/', controller.addTodo)
todo.get('/:id', authorization, controller.getTodoItem)
todo.put('/:id', authorization, controller.editTodo)
todo.delete('/:id', authorization, controller.deleteTodo)

module.exports = todo