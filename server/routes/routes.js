const route = require('express').Router()
const todo = require('./todo')
const user = require('./user')


route.use('/user',user)
route.use('/todo',todo)



module.exports = route