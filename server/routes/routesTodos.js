var express = require('express')
var router = express.Router()
const ControllerTodos = require('../controllers/ControllerTodos')

router.post('/', ControllerTodos.create)
router.get('/', ControllerTodos.read)
router.get('/:id', ControllerTodos.find)
router.put('/:id', ControllerTodos.update)
router.delete('/:id', ControllerTodos.destroy)



module.exports = router