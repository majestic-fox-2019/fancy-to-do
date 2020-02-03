const router = require('express').Router()
const user = require('./user')
const todo = require('./todo')
const project = require('./project')
const authentication = require('../middlewares/authentication')

router.use('/', user)

router.use(authentication)

router.use('/todos', todo)

router.use('/projects', project)

module.exports = router