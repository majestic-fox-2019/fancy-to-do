const controllerTodos = require('../controllers/todos')
const router = require('express').Router()
const auth = require('../middleware/auth')

router.get('/', auth, controllerTodos.findAll)
router.post('/', auth, controllerTodos.create)
router.get('/:id', auth, controllerTodos.findOne)
router.put('/:id', auth, controllerTodos.updateAll)
router.delete('/:id', auth, controllerTodos.delete)


module.exports = router

