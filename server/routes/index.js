"use strict"

const express = require('express')
const router = express.Router()
const userRoutes = require('./user')
const todoRoutes = require('./todo')
const projectRoutes = require('./project')

router.use('/users', userRoutes)
router.use('/todos', todoRoutes)
router.use('/projects', projectRoutes)

module.exports = router