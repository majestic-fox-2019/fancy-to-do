const UserRoute = require('express').Router()
const UserController = require('../controllers/userController')

UserRoute.post('/', UserController.register)

module.exports = UserRoute