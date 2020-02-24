const userRouter = require('express').Router()

const ControllerUser = require('../controllers/user')

userRouter.post('/register', ControllerUser.register)

userRouter.post('/login', ControllerUser.login)

userRouter.post('/g-sign-in', ControllerUser.gSignIn)

userRouter.get('/project/:id', ControllerUser.findAll)

module.exports = userRouter
