const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/', userController.login)
router.post('/google', userController.googleSignIn)

module.exports = router