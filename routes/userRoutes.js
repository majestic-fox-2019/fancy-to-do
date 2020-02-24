const router = require('express').Router()
const Users = require('../controllers/user')

router.post('/register', Users.register)
router.post('/login', Users.login)

module.exports = router