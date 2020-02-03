const router = require('express').Router()
const user = require('./user')
const todo = require('./todo')
const authorization = require('../middlewares/authorization')

router.use('/', user)

router.use(authorization)

router.use('/todos', todo)

module.exports = router