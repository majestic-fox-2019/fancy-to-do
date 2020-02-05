const routes = require('express').Router()
const controlUser = require("../controllers/userController")

routes.post("/register", controlUser.register)
routes.post("/login", controlUser.login)
routes.get("/:id", controlUser.getUserById)
routes.post("/google", controlUser.google)

module.exports = routes