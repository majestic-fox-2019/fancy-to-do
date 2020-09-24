'use strict'

const express = require('express')
const route = express.Router()
const todoRoute = require('./todo')
const userRoute = require('./user')

route.use('/todo', todoRoute)
route.use('/users', userRoute)

module.exports= route