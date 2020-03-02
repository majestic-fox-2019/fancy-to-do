const todo = require('express').Router()
const controller = require('../controllers/todoController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
todo.use(authentication)
todo.get('/',controller.list)
todo.post('/',controller.create)
todo.get('/:id',authorization,controller.find)
todo.put('/:id',authorization,controller.update)
todo.delete('/:id',authorization,controller.delete)



module.exports = todo