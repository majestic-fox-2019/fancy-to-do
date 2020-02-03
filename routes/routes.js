const express = require('express')
const route = express.Router()
const todo = require('./todo')

route.use('/todo',todo)


module.exports = route