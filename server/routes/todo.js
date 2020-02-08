const router = require('express').Router()
const Todo = require('../controllers/todoControllers')
const Authenticate = require('../middlewares/authentication')
const { todoAuthorization } = require('../middlewares/authorization')

router.post('/', Authenticate, Todo.createTodo)
router.get('/', Authenticate, Todo.getUserTodos)
router.delete('/:id', Authenticate, todoAuthorization, Todo.deleteTodo)
router.put('/:id', Authenticate, todoAuthorization, Todo.updateTodo)
router.patch('/:id', Authenticate, todoAuthorization, Todo.patchStatus)

module.exports = router
