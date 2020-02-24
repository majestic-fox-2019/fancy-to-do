const router = require('express').Router()
const User = require('./user')
const Todo = require('./todo')
const Project = require('./project')

router.use('/users', User)
router.use('/todos', Todo)
router.use('/projects', Project)

module.exports = router
