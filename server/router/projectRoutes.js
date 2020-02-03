const routes = require("express").Router()
const controlProject = require("../controllers/projectController")
const authentication = require("../middlewares/authenticate")
const { forProject } = require("../middlewares/authorization")


//add project
routes.post("/", authentication, controlProject.createProject)

routes.post("/addMember/:idProject", authentication, forProject, controlProject.addMember)

routes.get("/myProjects", authentication, controlProject.getMyProjects)

routes.get("/", controlProject.allProject)

//add todo di project
routes.post("/todo/:idProject", authentication, forProject, controlProject.addTodoProject)

//edit todo project
routes.put("/todo/:idTodo", authentication, forProject, controlProject.editTodoProject)

routes.delete("/todo/:idTodo", authentication, forProject, controlProject.deleteTodoProject)

module.exports = routes