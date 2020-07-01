const express = require('express')
const router = express.Router()
const routeTodo =require('./todo')
const routeRegister = require('./register')
const routeLogin = require('./login')
const verifyGoogle = require('../middleware/verifyGoogle')
const authentication = require('../middleware/authentication')
const sessionController = require('../Controller/sessionController')


router.use('/googleLogin',verifyGoogle,sessionController.googleLogin)
router.use('/register',routeRegister)
router.use('/login',routeLogin)
router.use(authentication)
router.use('/todos',routeTodo)



module.exports = router