const router = require('express').Router()
const UserController = require('../controllers/UserController')
const middleware = require('../middlewares/middleware')

router.post("/login", UserController.login)
router.post("/login/gsignin", UserController.loginGoogle)
router.post("/", UserController.registerUser)
router.get("/", middleware.verifyToken, UserController.getUsers)

module.exports = router