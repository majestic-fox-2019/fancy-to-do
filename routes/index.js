const route = require("express").Router()
const todo = require("./todos")

route.use('/todos',todo)

module.exports = route