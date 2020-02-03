const router = require('express').Router()
const controller = require('../controllers/todoController')

router.post('/', controller.create)

router.get('/', controller.findAll)

router.get('/:id', controller.findOne)

router.delete('/:id', controller.delete)

router.put('/:id', controller.updateOne)

router.patch('/:id', controller.changeStatus)
module.exports = router