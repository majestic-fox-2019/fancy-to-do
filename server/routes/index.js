const router = require('express').Router()
const todo = require('./todo')
const user = require('./user')
const login = require('./login')
const register = require('./register')
const solat = require('../controllers/solat')
const authentiocation = require('../middlewares/authentication')

router.use('/register', register)
router.use('/login', login)
router.use('/todos', todo)
router.use('/user', user)
router.get('/solat', solat.getAPISolat)

module.exports = router
