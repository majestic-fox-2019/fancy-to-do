var express = require('express')
var router = express.Router()
const ControllerTodo = require('../controllers/controllerTodo')

router.post('/', ControllerTodo.create)
router.get('/', ControllerTodo.findall)
router.get('/:id', ControllerTodo.findone)
router.put('/:id', ControllerTodo.edit)
router.delete('/:id', ControllerTodo.delete)



module.exports = router