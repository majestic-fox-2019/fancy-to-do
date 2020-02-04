const IndexRoute = require('express').Router()
const TaskRoute = require('./taskRoute')
const UserRoute = require('./userRoute') 

IndexRoute.use('/todos', TaskRoute)
IndexRoute.use('/user', UserRoute)

module.exports = IndexRoute