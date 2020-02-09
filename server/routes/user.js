const controllerUser = require('../controllers/user')
const router = require('express').Router()

router.post('/login', controllerUser.login)
router.post('/register', controllerUser.register)
router.post('/googleSignIn', controllerUser.googleSign)
router.get('/userGithub', controllerUser.gitHub)


module.exports = router