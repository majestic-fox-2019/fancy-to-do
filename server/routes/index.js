var express = require('express')
var router = express.Router()

router.use('/todos', require('./todo'))
router.use('/users', require('./user'))
router.use('/projects', require('./project'))
module.exports = router
