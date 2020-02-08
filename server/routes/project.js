const projectRouter = require('express').Router()

const ControllerProject = require('../controllers/project')

const authenticate = require('../middlewares/authenticate')

projectRouter.use(authenticate)

projectRouter.post('/', ControllerProject.create)

projectRouter.post('/:id/join', ControllerProject.joinProject)

projectRouter.post('/:id/invite', ControllerProject.inviteMember)

projectRouter.get('/', ControllerProject.findAll)

const { checkProject, authorize } = require('../middlewares/authorize-project')

projectRouter.use('/:id', checkProject)

projectRouter.get('/:id/details', ControllerProject.findOne)

projectRouter.use('/:id', authorize)

projectRouter.put('/:id', ControllerProject.update)

projectRouter.delete('/:id', ControllerProject.delete)

module.exports = projectRouter
