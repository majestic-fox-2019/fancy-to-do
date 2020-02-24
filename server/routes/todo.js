const todoRouter = require('express').Router()

const TodoController = require('../controllers/todo')

const authenticate = require('../middlewares/authenticate')

const authorize = require('../middlewares/authorize-todo')

todoRouter.use(authenticate)

todoRouter.post('/', TodoController.create)

todoRouter.get('/', TodoController.findAll)

todoRouter.get('/:id', authorize, TodoController.findOne)

todoRouter.put('/:id', authorize, TodoController.update)

todoRouter.patch('/:id', authorize, TodoController.patch)

todoRouter.delete('/:id', authorize, TodoController.delete)

module.exports = todoRouter
