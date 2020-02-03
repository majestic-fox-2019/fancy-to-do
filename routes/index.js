var express = require('express')
var router =express.Router()
const Todos = require('./routeTodo')

router.use('/todos',Todos)



module.exports = router