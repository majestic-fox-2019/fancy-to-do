const router = require('express').Router()
const todos = require('./todos')
const user = require('./user')
const authentic = require('../middleware/authen')



router.use('/user', user)
router.use(authentic)
router.use('/todos', todos)


module.exports = router