const router = require('express').Router()
const TodoRouter = require('./todosRouter')

router.use('/todos', TodoRouter)

module.exports = router