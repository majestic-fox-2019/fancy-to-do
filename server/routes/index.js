const route = require("express").Router()
const todo = require("./todos")
const project = require("./projects")
const projectuser = require("./projectUser")
const userController = require("../controllers/users")
const googleVerify = require("../middlewares/googleVerify")

route.post('/register',userController.register)
route.post('/login',userController.login)
route.post('/google/login',googleVerify,userController.googleLogin)
route.use('/todos',todo)
route.use('/project',project)
route.use('/projectuser',projectuser)

module.exports = route