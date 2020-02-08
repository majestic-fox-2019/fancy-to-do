"use strict"

const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/register', userController.create)
router.post('/login', userController.login)
router.post('/login-google', userController.loginGoogle)

module.exports = router