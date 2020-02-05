const Todo = require('../controllers/todoController');

const router = require('express').Router();

router.post('/', Todo.create)
router.get('/', Todo.read)
router.get('/:id', Todo.readOne)
router.put('/:id', Todo.update)
router.delete('/:id', Todo.delete)

module.exports = router