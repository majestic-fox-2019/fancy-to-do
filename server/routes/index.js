const mainRouter = require('express').Router()

const userRouter = require('./user')
const todoRouter = require('./todo')
const projectRouter = require('./project')
const projectTodoRouter = require('./projectTodo')

mainRouter.use('/users', userRouter)
mainRouter.use('/todos', todoRouter)
mainRouter.use('/projects', projectRouter)
mainRouter.use('/todos/projects', projectTodoRouter)

module.exports = mainRouter
