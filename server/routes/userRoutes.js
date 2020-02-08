const router = require('express').Router()
const Users = require('../controllers/user')

router.post('/register', Users.register)
router.post('/login', Users.login)
router.post('/google/login', Users.googleSignIn)


module.exports = router