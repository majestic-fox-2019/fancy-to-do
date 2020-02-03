const controllerTodos = require('../controllers/todos')
const router = require('express').Router()

router.post('/', controllerTodos.create)
router.get('/', controllerTodos.findAll)
router.get('/:id', controllerTodos.findOne)
router.put('/:id', controllerTodos.updateAll)
router.delete('/:id', controllerTodos.delete)


module.exports = router

