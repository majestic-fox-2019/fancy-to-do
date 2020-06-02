const router = require('express').Router()
const TodoController = require('../controllers/todo')
const authentiocation = require('../middlewares/authentication')
const authorisation = require('../middlewares/authorisation')

router.get('/', authentiocation,  TodoController.showData)
router.get('/:id', authentiocation,authorisation, TodoController.showOne)
router.post('/', authentiocation, TodoController.create)
router.put('/:id', authentiocation, authorisation, TodoController.update)
router.delete('/:id',authentiocation,authorisation, TodoController.delete)
router.get('/filter/:status', authentiocation, TodoController.filter)


module.exports = router