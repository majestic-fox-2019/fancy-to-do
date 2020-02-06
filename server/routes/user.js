const controllerUser = require('../controllers/user')
const router = require('express').Router()

router.post('/login', controllerUser.login)
router.post('/register', controllerUser.register)


module.exports = router