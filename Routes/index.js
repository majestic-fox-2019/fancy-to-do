const express = require('express')
const router = express.Router()
const routeTodo =require('./todo')

router.use('/todos',routeTodo)



module.exports = router