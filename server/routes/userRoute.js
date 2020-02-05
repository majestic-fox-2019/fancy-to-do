const userRoute = require('express').Router()

const userController = require('../controlllers/userController')

userRoute.post('/login', userController.login)
userRoute.post('/register', userController.register)
userRoute.get('/google/signin', userController.googleSignIn)
userRoute.get('/google/redirect', userController.googleRedirect)

module.exports = userRoute