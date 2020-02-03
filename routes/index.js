const route  = require('express').Router()
const todo = require('./todo')

route.use('/todos', todo)

module.exports = route