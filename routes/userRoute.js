const userRoute = require('express').Router()

const userController = require('../controlllers/userController')

userRoute.post('/login', userController.login)
userRoute.post('/register', userController.register)

module.exports = userRoute