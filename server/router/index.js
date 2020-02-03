const routes = require('express').Router()
const userRoutes = require('../router/userRoutes')
const todoRoutes = require("./todoRoutes")
const projectRoutes = require('./projectRoutes')

routes.use("/user", userRoutes)
routes.use("/todos", todoRoutes)
routes.use("/projects", projectRoutes)
module.exports = routes