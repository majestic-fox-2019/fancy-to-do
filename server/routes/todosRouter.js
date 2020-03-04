const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const middleware = require('../middlewares/middleware')

router.get("/", middleware.verifyToken, TodoController.getTodolist)
router.post("/", middleware.verifyToken, TodoController.createTodolist)
router.get("/:id", middleware.verifyToken, middleware.authorUser, TodoController.detailTodo)
router.put("/:id", middleware.verifyToken, middleware.authorUser, TodoController.updateTodolist)
router.delete("/:id", middleware.verifyToken, middleware.authorUser, TodoController.destroyTodolist)

module.exports = router