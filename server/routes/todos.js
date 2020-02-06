const controllerTodos = require('../controllers/todos')
const router = require('express').Router()
// const authen = require('../middleware/authen')
const authoris = require('../middleware/authoriz')

// router.get('/', authen, controllerTodos.findAll)
// router.post('/', authen, controllerTodos.create)
// router.get('/:id', authen, controllerTodos.findOne)
// router.put('/:id', authen, controllerTodos.updateAll)
// router.delete('/:id', authen, controllerTodos.delete)

router.post('/', controllerTodos.create)
// router.get('/holidays', controllerTodos.holiday)
router.get('/', controllerTodos.findAll)
router.get('/:id', authoris, controllerTodos.findOne)
router.put('/:id', authoris, controllerTodos.updateAll)
router.delete('/:id', authoris, controllerTodos.delete)


module.exports = router

