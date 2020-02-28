const router = require('express').Router()
const user = require('./user')
const todo = require('./todo')
const project = require('./project')
const authentication = require('../middlewares/authentication')
const sendGrid = require('./sendGrid')

router.use('/', user)

router.use(authentication)

router.use('/sendMail', sendGrid)

router.use('/todos', todo)

router.use('/projects', project)

module.exports = router