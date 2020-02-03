const router = require('express').Router()
const todos = require('./todoRoutes')

router.use('/todos', todos)


module.exports = router