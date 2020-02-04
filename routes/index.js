const route = require('express').Router()
const todoRoute = require('./todoRoute')
const userRoute = require('../routes/userRoute')
const authentication = require('../middlewares/authentication')

route.use('/', userRoute)
route.use(authentication)
route.use('/todos', todoRoute)

module.exports = route