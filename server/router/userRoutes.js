const routes = require('express').Router()
const controlUser = require("../controllers/userController")

routes.post("/register", controlUser.register)
routes.post("/login", controlUser.login)

module.exports = routes