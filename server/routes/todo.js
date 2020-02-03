const router = require('express').Router()
const Todo = require('../controllers/todoControllers')
const Authenticate = require('../middlewares/authentication')
const Authorize = require('../middlewares/authorization')

router.post('/', Authenticate, Todo.createTodo)
router.get('/', Todo.getAllTodos)
router.get('/:id', Authenticate, Todo.getUserTodos)
router.delete('/:id', Authenticate, Authorize, Todo.deleteTodo)
router.put('/:id', Authenticate, Authorize, Todo.updateTodo)
router.patch('/:id', Authenticate, Authorize, Todo.patchStatus)

module.exports = router