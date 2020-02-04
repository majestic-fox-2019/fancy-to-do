const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')
const auth = require('../middleware/authentication')
const authorize = require('../middleware/authorization')

router.post('/', auth, todoController.create)
router.get('/', todoController.findAll)
router.get('/:id', authorize, todoController.findOne)
router.put('/:id', todoController.update)
router.delete('/:id', todoController.delete)


module.exports = router