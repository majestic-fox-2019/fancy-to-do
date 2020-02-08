"use strict"

const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const auth = require('../middlewares/auth')


router.use(auth.authenticate)
router.post('/', projectController.create)
router.get('/', projectController.findAll)
router.post('/join', projectController.joinProject)

router.use('/:id', auth.authorizeProject)
router.delete('/:id/leave', projectController.leaveProject)
router.post('/:id', projectController.addTodo)
router.get('/:id', projectController.findOne)

module.exports = router