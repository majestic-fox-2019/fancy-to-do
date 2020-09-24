'use strict'

const express = require('express')
const route = express.Router()
const todoControllers = require('../controllers/todo')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.post('/', authentication, todoControllers.create)
route.get('/', authentication, todoControllers.readAll)
route.get('/:id', todoControllers.readOne)
route.put('/:id', todoControllers.update)
route.delete('/:id', todoControllers.delete)

module.exports = route