const router = require('express').Router()
const UserController = require('../controllers/UserController')
const middleware = require('../middlewares/middleware')

router.post("/login", UserController.login)
router.get("/", middleware.verifyToken, UserController.getUsers)
router.post("/", middleware.verifyToken, UserController.registerUser)
router.get("/:id", middleware.verifyToken, middleware.authorUser, UserController.detailUser)
router.put("/:id", middleware.verifyToken, middleware.authorUser, UserController.updateUser)
router.delete("/:id", middleware.verifyToken, middleware.authorUser, UserController.destroyUser)

module.exports = router