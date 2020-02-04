const express = require('express')
const router = express.Router()
const todo = require('./todo')
const register = require('./register')
const login = require('./login')
const authentication = require('../middleware/authentication')

router.use('/register', register)
router.use('/login', login)

router.use(authentication)

router.use('/todos', todo)

module.exports = router