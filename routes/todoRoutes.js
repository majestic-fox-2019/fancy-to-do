const router = require('express').Router()
const Todos = require('../controllers/todos')
const verifyToken = require('../middlewares/verifyToken')
const authorized = require('../middlewares/authorization')

router.use(verifyToken)

router.get('/',Todos.find)
router.post('/', Todos.create)
router.use("/:id", authorized)
router.put('/:id', Todos.update)
router.get('/:id', Todos.findById)
router.delete('/:id', Todos.destroy)

module.exports = router