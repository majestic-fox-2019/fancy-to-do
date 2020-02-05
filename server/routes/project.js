const router = require('express').Router()
const ProjectController = require('../controllers/projectController')
const Authenticate = require('../middlewares/authentication')
const { projectAuthorization } = require('../middlewares/authorization')

router.get('/', ProjectController.getAllProject)
router.get('/my-projects', Authenticate, ProjectController.getUserProject)
router.get('/:projectId', Authenticate, ProjectController.getOneProject) // Get project detail with members and todos inside
router.post('/', Authenticate, ProjectController.createProject)
router.delete('/:projectId', Authenticate, projectAuthorization, ProjectController.deleteProject)
router.post('/:projectId', Authenticate, projectAuthorization, ProjectController.inviteProject)
router.patch('/status/:projectId', Authenticate, ProjectController.patchStatus)
router.post('/todos/:projectId', Authenticate, ProjectController.createProjectTodo)
router.get('/todos/:projectId', Authenticate, ProjectController.getAllProjectTodo)

module.exports = router
