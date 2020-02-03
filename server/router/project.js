const router = require('express').Router()
const controller = require('../controllers/projectController')

router.get('/', controller.findAll)

router.post('/', controller.create)

router.get('/:id', controller.findOne)

router.post('/addMember', controller.addProjectMember)

module.exports = router