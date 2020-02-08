const router = require('express').Router()
const controller = require('../controllers/projectController')
const authorization = require('../middlewares/authorization')

router.get('/', controller.findAll)

router.post('/', controller.create)

router.get('/:projectId', authorization.projectAuth, controller.findProjectMember)

router.post('/addMember', authorization.projectAuth, controller.addProjectMember)

router.delete('/member/:projectId', authorization.projectAuth, controller.leaveGroup)

router.delete('/:projectId', authorization.projectAuth, authorization.deleteProjectAuth, controller.deleteProject)

module.exports = router