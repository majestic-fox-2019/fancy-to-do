var express = require('express')
var router = express.Router()
const ControllerUser = require('../controllers/ControllerUser')

// >>>> "/""
router.post('/register', ControllerUser.register)
router.get('/data', ControllerUser.read)
router.post('/login', ControllerUser.login)
router.put('/:id', ControllerUser.update)
router.delete('/:id', ControllerUser.destroy)



module.exports = router