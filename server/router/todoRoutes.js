const routes = require('express').Router()
const controlTodo = require("../controllers/todoController")
const authentication = require('../middlewares/authenticate')
const { forIndividualTodo } = require("../middlewares/authorization")

routes.post("/", authentication, controlTodo.createTodo)
routes.get("/", controlTodo.getAll)
routes.get("/:id", controlTodo.getTodoById)
routes.put("/:id", authentication, forIndividualTodo, controlTodo.editTodo)
routes.delete("/:id", authentication, forIndividualTodo, controlTodo.deleteTodo)
routes.get("/all/mine", authentication, controlTodo.getMine)

module.exports = routes