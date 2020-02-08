const router = require('express').Router()

const Controller = require('../controllers/projectTodo')

const authenticate = require('../middlewares/authenticate')

const { checkProject, authorize } = require('../middlewares/authorize-project')

router.use(authenticate)

router.use('/:id', checkProject)

router.get('/:id', Controller.findAll)

router.use('/:id', checkProject, authorize)

router.post('/:id', Controller.create)

module.exports = router
