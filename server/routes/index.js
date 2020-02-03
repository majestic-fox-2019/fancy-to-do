'use strict'

const express = require('express')
const route = express.Router()
const todoRoute = require('./todo')

route.use('/todo', todoRoute)

module.exports= route