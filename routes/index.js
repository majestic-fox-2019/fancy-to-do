const route = require("express").Router()
const todo = require("./todos")
const userController = require("../controllers/users")


route.post('/register',userController.register)
route.post('/login',userController.login)
route.use('/todos',todo)
module.exports = route