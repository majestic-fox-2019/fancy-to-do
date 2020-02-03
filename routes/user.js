const controllerTodos = require('../controllers/todos')
const router = require('express').Router()

router.post('/', controllerTodos.register)
router.post('/', controllerTodos.login)



module.exports = router