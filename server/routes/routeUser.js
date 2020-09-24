var express = require('express')
var router = express.Router()
const controllerUser = require('../controllers/controllerUser')

router.post('/register',controllerUser.register)
router.post('/login',controllerUser.login)
router.post('/google-sign-in', controllerUser.googleSignIn)





module.exports = router