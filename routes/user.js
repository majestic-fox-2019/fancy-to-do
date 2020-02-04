const user = require('express').Router()
const userController = require('../controllers/userController')

user.post('/register',userController.register)
user.post('/login',userController.login)


module.exports = user