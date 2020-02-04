const router = require('express').Router()
const UserRouter = require('./userRouter')
const TodoRouter = require('./todosRouter')

router.use('/users', UserRouter)
router.use('/todos', TodoRouter)

module.exports = router