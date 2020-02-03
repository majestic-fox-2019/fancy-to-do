const Route = require('express').Router()
const TaskController = require('../controllers/taskController')

Route.get('/', TaskController.list)
Route.post('/', TaskController.add)
Route.get('/:id', TaskController.findOneData)
Route.put('/:id', TaskController.update)
Route.delete('/:id', TaskController.delete)

module.exports = Route