const router = require('express').Router()
const controller = require('../controllers/todoController')
const authorization = require('../middlewares/authorization')

router.post('/', controller.create)

router.get('/', controller.findAll)

router.get('/:id', controller.findOne)

router.delete('/:id', authorization.todoAuth, controller.delete)

router.put('/:id', authorization.todoAuth, controller.updateOne)

router.patch('/:id', authorization.todoAuth, controller.changeStatus)

router.get('/status/:status', controller.filterPersonalTodo)

router.get('/project/:projectId', authorization.projectAuth, controller.findProjectTodo)

router.post('/project/:projectId', authorization.projectAuth, controller.createProjectTodo)

router.patch('/project/:id', authorization.projectTodoAuth, authorization.projectAuth, controller.changeStatus)

router.delete('/project/:id', authorization.projectTodoAuth, authorization.projectAuth, controller.delete)

router.put('/project/:id', authorization.projectTodoAuth, authorization.projectAuth, controller.updateOne)



module.exports = router