const routes = require("express").Router()
const controlProject = require("../controllers/projectController")
const authentication = require("../middlewares/authenticate")
const { forProject } = require("../middlewares/authorization")


//add project
routes.post("/", authentication, controlProject.createProject)

routes.get("/name/:id", controlProject.getProjectById)

routes.post("/addMember/:idProject", authentication, forProject, controlProject.addMember)

//all project that i am included
routes.get("/myProjects", authentication, controlProject.getMyProjects)

//all existing project
routes.get("/", controlProject.allProject)

//add todo di project
routes.post("/todo/:idProject", authentication, forProject, controlProject.addTodoProject)

//edit todo project
routes.put("/todo/:idTodo", authentication, forProject, controlProject.editTodoProject)

//delete todo project
routes.delete("/todo/:idTodo", authentication, forProject, controlProject.deleteTodoProject)

//all todo in selected project
routes.get("/all/todo/:idProject", controlProject.allTodoInProject)

routes.get("/all/members/:idProject", controlProject.getAllMemberinProject)

module.exports = routes