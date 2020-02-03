const express = require('express')
const todo = express.Router()
const controller = require('../controllers/controller')

todo.get('/',controller.list)
todo.post('/',controller.create)
todo.get('/:id',controller.find)
todo.put('/:id',controller.update)
todo.delete('/:id',controller.delete)



module.exports = todo