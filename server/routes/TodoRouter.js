'use strict';

const TodoController = require('../controllers/TodoController');
const router = require('express').Router();
const { authorizeTodo } = require('../middlewares/auth');

router.post('/', TodoController.create);
router.get('/', TodoController.readAll);

router.get('/:id', authorizeTodo, TodoController.readOne);
router.put('/:id', authorizeTodo, TodoController.update);
router.delete('/:id', authorizeTodo, TodoController.delete);

module.exports = router;