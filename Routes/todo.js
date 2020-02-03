const express = require('express')
const router = express.Router()
const todoController = require('../Controller/todoController')

router.get('/',todoController.findAll)
router.post('/',todoController.create)
router.get('/:id',todoController.findOne)
router.put('/:id',todoController.update)
router.delete('/:id',todoController.delete)
module.exports = router