const router = require('express').Router()
const Todos = require('../controllers/todos')

router.get('/', Todos.find)
router.post('/', Todos.create)
router.put('/:id', Todos.update)
router.get('/:id', Todos.findById)
router.delete('/:id', Todos.destroy)

module.exports = router