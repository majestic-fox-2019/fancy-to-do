const TaskRoute = require('express').Router()
const TaskController = require('../controllers/taskController')
const authorization = require('../middlewares/authorization')

TaskRoute.get('/', TaskController.list)
TaskRoute.post('/', TaskController.add)
TaskRoute.get('/:id', authorization, TaskController.findOneData)
TaskRoute.put('/:id', authorization, TaskController.update)
TaskRoute.delete('/:id', authorization,TaskController.delete)

module.exports = TaskRoute