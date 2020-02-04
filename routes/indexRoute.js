const IndexRoute = require('express').Router()
const TaskRoute = require('./taskRoute')
const UserRoute = require('./userRoute')
const UserController = require('../controllers/userController')

// IndexRoute.use('/login', UserController.login)
IndexRoute.use('/todos', TaskRoute)
IndexRoute.use('/user', UserRoute)

module.exports = IndexRoute