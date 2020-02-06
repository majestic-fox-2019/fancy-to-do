const userRoute = require('express').Router()

const UserController = require('../controlllers/userController')
const googleVerify = require('../middlewares/googleVerify')

userRoute.post('/google/signin', googleVerify, UserController.googleLogin)
userRoute.post('/login', UserController.login)
userRoute.post('/register', UserController.register)

module.exports = userRoute