var express = require('express')
const app = express()
var router = express.Router()
const ControllerTodo = require('../controllers/controllerTodo')
const authorization = require('../middleware/authorization')

router.post('/', ControllerTodo.create)
router.get('/', ControllerTodo.findall)

// app.use(authorization)

router.get('/:id',authorization, ControllerTodo.findone)
router.put('/:id',authorization, ControllerTodo.edit)
router.delete('/:id', authorization, ControllerTodo.delete)


module.exports = router