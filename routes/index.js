const route = require('express').Router()
const todoRoute = require('./todoRoute')

route.use('/todos', todoRoute)

module.exports = route