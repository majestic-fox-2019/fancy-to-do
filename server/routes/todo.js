"use strict"

const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')
const auth = require('../middlewares/auth')

router.use(auth.authenticate)
router.post('/', todoController.create)
router.get('/', todoController.findAll)

router.use('/:id', auth.authorize)
router.delete('/:id', todoController.destroy)
router.put('/:id', todoController.updateAll)
router.patch('/:id/up', todoController.update)
router.patch('/:id/down', todoController.bakcUpdate)
router.get('/:id', todoController.findOne)

module.exports = router