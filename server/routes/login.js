const router = require('express').Router()
const UserController = require('../controllers/user')

router.post('/', UserController.login)
router.post('/google-sign-in', UserController.googleSignIn)

module.exports = router