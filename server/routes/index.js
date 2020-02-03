const router = require('express').Router()
const User = require('./user')
const Todo = require('./todo')

router.use('/users', User)
router.use('/todos', Todo)

module.exports = router
