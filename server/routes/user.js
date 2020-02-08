'use strict'

const express = require('express')
const route = express.Router()
const userController = require('../controllers/user')

route.post('/register', userController.register)
route.post('/login', userController.login)
route.post('/googleSignIn', userController.googleLogin)

module.exports= route