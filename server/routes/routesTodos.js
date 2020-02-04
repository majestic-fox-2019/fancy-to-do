var express = require('express')
var router = express.Router()
const ControllerTodos = require('../controllers/ControllerTodos')
const authorization = require("../middleware/authorization")


router.post('/', ControllerTodos.create)
router.get('/', ControllerTodos.read)
router.get('/:id', authorization, ControllerTodos.find)
router.put('/:id', authorization, ControllerTodos.update)
router.delete('/:id', authorization, ControllerTodos.destroy)



module.exports = router