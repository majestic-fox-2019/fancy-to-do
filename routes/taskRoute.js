const TaskRoute = require('express').Router()
const TaskController = require('../controllers/taskController')

TaskRoute.get('/', TaskController.list)
TaskRoute.post('/', TaskController.add)
TaskRoute.get('/:id', TaskController.findOneData)
TaskRoute.put('/:id', TaskController.update)
TaskRoute.delete('/:id', TaskController.delete)

module.exports = TaskRoute