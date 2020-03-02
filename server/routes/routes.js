const route = require('express').Router()
const todo = require('./todo')
const user = require('./user')
const project = require('./project')


route.use('/user',user)
route.use('/todo',todo)
route.use('/project',project)


module.exports = route