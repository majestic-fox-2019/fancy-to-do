'use strict'

const express = require('express')
const route = express.Router()
const todoControllers = require('../controllers/todo')

route.post('/', todoControllers.create)
route.get('/', todoControllers.readAll)
route.get('/:id', todoControllers.readOne)
route.put('/:id', todoControllers.update)
route.delete('/:id', todoControllers.delete)

module.exports = route