const UserRoute = require('express').Router()
const UserController = require('../controllers/userController')

UserRoute.post('/register', UserController.register)

module.exports = UserRoute