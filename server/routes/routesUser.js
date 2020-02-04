var express = require('express')
var router = express.Router()
const ControllerUser = require('../controllers/ControllerUser')

router.post('/', ControllerUser.create)
router.get('/', ControllerUser.read)
router.get('/:id', ControllerUser.find)
router.put('/:id', ControllerUser.update)
router.delete('/:id', ControllerUser.destroy)



module.exports = router