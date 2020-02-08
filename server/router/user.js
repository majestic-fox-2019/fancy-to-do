const router = require('express').Router()
const controller = require('../controllers/userController')

router.post('/', controller.register)

router.post('/login', controller.login)

router.post('/googleSign', controller.gSign)

module.exports = router