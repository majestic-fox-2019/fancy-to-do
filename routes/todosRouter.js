const router = require('express').Router()
const TodoController = require('../controllers/TodoController')

router.get("/", TodoController.getTodolist)
router.post("/", TodoController.createTodolist)
router.get("/:id", TodoController.detailTodo)
router.put("/:id", TodoController.updateTodolist)
router.delete("/:id", TodoController.destroyTodolist)

module.exports = router