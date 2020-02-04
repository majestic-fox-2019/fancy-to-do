const express = require('express')
const router = express.Router()
const todoController = require('../Controller/todoController')
const authorization = require('../middleware/authorization')

router.get('/',todoController.findAll)
router.post('/',todoController.create)
router.get('/:id',authorization,todoController.findOne)
router.put('/:id',authorization,todoController.update)
router.delete('/:id',authorization,todoController.delete)
module.exports = router