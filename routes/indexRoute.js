const IndexRoute = require('express').Router()
const TaskRoute = require('./taskRoute')
const UserRoute = require('./userRoute')
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

IndexRoute.post('/login', UserController.login)
IndexRoute.use('/user', UserRoute)
IndexRoute.use(authentication)
IndexRoute.use('/todos', TaskRoute)

module.exports = IndexRoute